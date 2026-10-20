// Checks that every `color(display-p3 …)` override matches its sRGB hex fallback:
// - P3 color fits in sRGB → the hex must be the same color (up to rounding).
// - P3 color is wider than sRGB → the hex must be its CSS gamut-mapped version
//   (https://www.w3.org/TR/css-color-4/#gamut-mapping), within a just-noticeable difference.
// Usage: node scripts/check-p3.mjs [path/to/file.css]
import {readFileSync} from 'node:fs';

const file = process.argv[2] ?? 'src/styles/global.css';

// Limits in ΔE OK: rounding noise, and the CSS Color 4 just-noticeable difference.
const SAME = 0.005;
const JND = 0.02;

/*----------------------
|  Color math
-----------------------*/
const mul = (m, v) => m.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
const inv = ([[a, b, c], [d, e, f], [g, h, i]]) => {
  const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  return [
    [e * i - f * h, c * h - b * i, b * f - c * e],
    [f * g - d * i, a * i - c * g, c * d - a * f],
    [d * h - e * g, b * g - a * h, a * e - b * d],
  ].map((r) => r.map((v) => v / det));
};

// sRGB and Display P3 share the same transfer function and D65 white point.
const toLinear = (c) => {
  const abs = Math.abs(c);
  return (
    Math.sign(c) *
    (abs <= 0.04045 ? abs / 12.92 : ((abs + 0.055) / 1.055) ** 2.4)
  );
};
const toGamma = (c) => {
  const abs = Math.abs(c);
  return (
    Math.sign(c) *
    (abs <= 0.0031308 ? abs * 12.92 : 1.055 * abs ** (1 / 2.4) - 0.055)
  );
};

const SRGB_TO_XYZ = [
  [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
  [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
  [0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
];
const P3_TO_XYZ = [
  [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
  [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
  [0, 0.04511338185890264, 1.043944368900976],
];
const XYZ_TO_LMS = [
  [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
  [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
  [0.0481771893596242, 0.2642395317527308, 0.6335478284694309],
];
const LMS_TO_OKLAB = [
  [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
  [1.9779985324311684, -2.42859224204858, 0.450593709617411],
  [0.0259040424655478, 0.7827717124575296, -0.8086757549230774],
];
const XYZ_TO_SRGB = inv(SRGB_TO_XYZ);
const LMS_TO_XYZ = inv(XYZ_TO_LMS);
const OKLAB_TO_LMS = inv(LMS_TO_OKLAB);

const xyzToOklab = (xyz) =>
  mul(LMS_TO_OKLAB, mul(XYZ_TO_LMS, xyz).map(Math.cbrt));
const oklabToXyz = (lab) =>
  mul(
    LMS_TO_XYZ,
    mul(OKLAB_TO_LMS, lab).map((v) => v ** 3),
  );
const srgbToOklab = (rgb) => xyzToOklab(mul(SRGB_TO_XYZ, rgb.map(toLinear)));
const p3ToOklab = (p3) => xyzToOklab(mul(P3_TO_XYZ, p3.map(toLinear)));
const oklabToSrgb = (lab) => mul(XYZ_TO_SRGB, oklabToXyz(lab)).map(toGamma);

const deltaE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const clip = (rgb) => rgb.map((c) => Math.min(1, Math.max(0, c)));
const inGamut = (rgb) => rgb.every((c) => c >= 0 && c <= 1);

// CSS Color 4 gamut mapping: reduce OKLCH chroma until clipping is no longer noticeable.
const gamutMap = (lab) => {
  const [l, a, b] = lab;
  if (l >= 1) return [1, 1, 1];
  if (l <= 0) return [0, 0, 0];
  const origin = oklabToSrgb(lab);
  if (inGamut(origin)) return origin;
  const hue = Math.atan2(b, a);
  const withChroma = (c) => [l, c * Math.cos(hue), c * Math.sin(hue)];
  let clipped = clip(origin);
  if (deltaE(srgbToOklab(clipped), lab) < JND) return clipped;
  let [min, max, minInGamut] = [0, Math.hypot(a, b), true];
  while (max - min > 0.0001) {
    const chroma = (min + max) / 2;
    const current = withChroma(chroma);
    const rgb = oklabToSrgb(current);
    if (minInGamut && inGamut(rgb)) {
      min = chroma;
      continue;
    }
    clipped = clip(rgb);
    const e = deltaE(srgbToOklab(clipped), current);
    if (e >= JND) max = chroma;
    else if (JND - e < 0.0001) return clipped;
    else [min, minInGamut] = [chroma, false];
  }
  return clipped;
};

const hexToSrgb = (hex) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
const srgbToHex = (rgb) =>
  '#' +
  rgb
    .map((c) =>
      Math.round(c * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');

/*----------------------
|  CSS parsing
-----------------------*/
// Collects custom property declarations along with the blocks they are nested in.
const collectDeclarations = (css) => {
  const declarations = [];
  const blocks = [];
  let buffer = '';
  for (const char of css.replace(/\/\*[\s\S]*?\*\//g, '')) {
    if (char === '{') {
      blocks.push(buffer.trim());
      buffer = '';
    } else if (char === ';' || char === '}') {
      const match = buffer.match(/^\s*(--[\w-]+)\s*:\s*([\s\S]+?)\s*$/);
      if (match) {
        const [, name, value] = match;
        const theme = blocks.some((b) => /\.dark\b/.test(b)) ? 'dark' : 'light';
        const p3 = blocks.some((b) => /^@supports\b.*display-p3/.test(b));
        declarations.push({name, value, theme, p3});
      }
      if (char === '}') blocks.pop();
      buffer = '';
    } else {
      buffer += char;
    }
  }
  return declarations;
};

/*----------------------
|  Check
-----------------------*/
const HEX = /^#[0-9a-f]{6}$/i;
const DISPLAY_P3 = /^color\(display-p3\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/;

const fallbacks = new Map();
const overrides = [];
for (const {name, value, theme, p3} of collectDeclarations(
  readFileSync(file, 'utf8'),
)) {
  const key = `${theme} ${name}`;
  if (!p3 && HEX.test(value)) fallbacks.set(key, value.toLowerCase());
  const match = p3 && value.match(DISPLAY_P3);
  if (match) overrides.push({key, value, color: match.slice(1).map(Number)});
}

if (overrides.length === 0) {
  console.error(`No display-p3 overrides found in ${file}`);
  process.exit(1);
}

let failures = 0;
for (const {key, value, color} of overrides) {
  const hex = fallbacks.get(key);
  if (!hex) {
    failures++;
    console.log(`FAIL  ${key.padEnd(38)} ${value} has no sRGB hex fallback`);
    continue;
  }
  const lab = p3ToOklab(color);
  const mapped = gamutMap(lab);
  const wide = deltaE(srgbToOklab(mapped), lab) > SAME;
  const error = deltaE(srgbToOklab(hexToSrgb(hex)), srgbToOklab(mapped));
  const ok = error <= (wide ? JND : SAME);
  if (!ok) failures++;
  const status = ok ? (wide ? 'wide' : 'same') : 'FAIL';
  const detail = `${hex} vs ${srgbToHex(mapped)} (ΔE ${error.toFixed(4)})`;
  console.log(`${status}  ${key.padEnd(38)} ${detail}`);
}

console.log(
  `\n${overrides.length} overrides checked, ${failures} failed.` +
    `\nsame: P3 fits in sRGB, hex matches it (ΔE ≤ ${SAME})` +
    `\nwide: P3 is wider than sRGB, hex matches its gamut-mapped version (ΔE ≤ ${JND})`,
);
if (failures > 0) process.exitCode = 1;
