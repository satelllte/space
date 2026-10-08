// Same as "stretch.fragment.glsl" from kinect-stretch, plus the "view" switch for the demo
uniform sampler2D tDiffuse;
uniform float amplitude;
uniform float seed;
uniform float steps;
uniform int view; // 0 = result, 1 = mask, 2 = original

varying vec2 vUv;

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

float discreteNoise(float x) {
  float step = floor(x * steps);
  return hash(step + seed);
}

void main() {
  vec2 uv = vUv;

  if (view == 2) {
    gl_FragColor = texture2D(tDiffuse, uv);
    return;
  }

  float noise = discreteNoise(uv.y) * amplitude;

  if (view == 1) {
    vec3 base = texture2D(tDiffuse, uv).rgb * 0.35;
    float outside = min(step(uv.x, noise) + step(1.0 - noise, uv.x), 1.0);
    gl_FragColor = vec4(mix(base, vec3(0.7, 0.0, 0.0), outside * 0.8), 1.0);
    return;
  }

  uv.x = clamp(uv.x, noise, 1.0 - noise);

  gl_FragColor = texture2D(tDiffuse, uv);
}
