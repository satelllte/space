uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uTime;

varying float vDistanceFactor;

void main() {
  vec3 color = mix(uColor1, uColor2, vDistanceFactor);
  gl_FragColor = vec4(color, 1.0);
}
