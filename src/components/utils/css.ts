// Same as Tailwind's "font-mono"
export const FONT_FAMILY_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

export const getCSSVariable = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/**
 * @param hue - Hue in degrees. `0`–`360`.
 * @param saturation - Saturation as a percentage. `0`–`100`.
 * @param lightness - Lightness as a percentage. `0`–`100`.
 */
export const getHSL = (
  hue: number,
  saturation: number,
  lightness: number,
): string => `hsl(${hue},${saturation}%,${lightness}%)`;

/**
 * @param hue - Hue in degrees. `0`–`360`.
 * @param saturation - Saturation as a percentage. `0`–`100`.
 * @param lightness - Lightness as a percentage. `0`–`100`.
 * @param alpha - Alpha/opacity. `0`–`1`.
 */
export const getHSLA = (
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number,
): string => `hsla(${hue},${saturation}%,${lightness}%,${alpha})`;
