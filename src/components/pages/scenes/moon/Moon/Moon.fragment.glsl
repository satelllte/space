// #ifdef GL_ES
// precision mediump float;
// #endif

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;
vec2 uTextureResolution = vec2(1280.0, 640.0); // TODO: pass as uniform

#define PI 3.1415926535
#define HALF_PI 1.57079632679

float speedMoon = 0.01;
float speedSun = 0.25;

vec3 sphereNormals(in vec2 uv) {
  uv = fract(uv)*2.0-1.0;
  vec3 ret;
  ret.xy = sqrt(uv * uv) * sign(uv);
  ret.z = sqrt(abs(1.0 - dot(ret.xy,ret.xy)));
  ret = ret * 0.5 + 0.5;
  return mix(vec3(0.0), ret, smoothstep(1.0,0.98,dot(uv,uv)) );
}

vec2 sphereCoords(vec2 _st, float _scale){
  float maxFactor = sin(HALF_PI);
  vec2 uv = vec2(0.0);
  vec2 xy = 2.0 * _st.xy - 1.0;
  float d = length(xy);
  if (d < (2.0-maxFactor)){
    d = length(xy * maxFactor);
    float z = sqrt(1.0 - d * d);
    float r = atan(d, z) / PI * _scale;
    float phi = atan(xy.y, xy.x);
    uv.x = r * cos(phi) + 0.5;
    uv.y = r * sin(phi) + 0.5;
  } else {
    uv = _st.xy;
  }
  return uv;
}

vec4 sphereTexture(in sampler2D _tex, in vec2 _uv) {
  vec2 st = sphereCoords(_uv, 1.0);
  float aspect = uTextureResolution.y / uTextureResolution.x;
  st.x = fract(st.x * aspect + uTime * speedMoon);
  return texture2D(_tex, st);
}

void main() {
  vec2 st = gl_FragCoord.xy * 0.5 / uResolution.xy;
  vec3 color = vec3(1.0);
  color *= sphereTexture(uTexture, st).rgb;

  // Calculate sun direction
  vec3 sunPos = normalize(vec3(cos(uTime*speedSun-HALF_PI),0.0,sin(speedSun*uTime-HALF_PI)));
  vec3 surface = normalize(sphereNormals(st)*2.0-1.0);

  // Add Shadows
  color *= dot(sunPos,surface);

  // Blend black the edge of the sphere
  float radius = 1.0 - length( vec2(0.5)-st )*2.0;
  color *= smoothstep(0.001,0.05,radius);

  // color = 1.0 - color;

  gl_FragColor = vec4(color, 0.01);
}
