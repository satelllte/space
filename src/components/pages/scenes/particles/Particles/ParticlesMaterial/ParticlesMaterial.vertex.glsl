uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uTime;

varying float vDistanceFactor;

// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

void main() {
  vec3 positionParticle = position;
  float distanceFactor = pow(1.0 - distance(positionParticle, vec3(0.0)), 1.5);
  positionParticle *= rotation3dY(uTime * distanceFactor);
  vDistanceFactor = distanceFactor;

  vec4 positionModel = modelMatrix * vec4(positionParticle, 1.0);
  vec4 positionView = viewMatrix * positionModel;
  vec4 positionProjected = projectionMatrix * positionView;

  gl_Position = positionProjected;
  gl_PointSize = 5.0;
  gl_PointSize *= 1.0 / -positionView.z;
}
