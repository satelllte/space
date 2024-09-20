import {degToRad} from 'three/src/math/MathUtils.js';

export function Lighting() {
  return (
    <directionalLight
      intensity={10.0}
      rotation={[degToRad(31.2), degToRad(-12.2), degToRad(10.2)]}
    />
  );
}
