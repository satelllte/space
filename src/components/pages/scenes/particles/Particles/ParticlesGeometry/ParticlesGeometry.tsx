import {useMemo} from 'react';
import {MathUtils} from 'three';

export function ParticlesGeometry() {
  const count = 2500;
  const itemSize = 3;
  const radius = 1.0;

  const array = useMemo(() => {
    const array = new Float32Array(count * itemSize);

    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * radius;
      const theta = MathUtils.randFloatSpread(360.0);
      const phi = MathUtils.randFloatSpread(360.0);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      array.set([x, y, z], i * itemSize);
    }
    return array;
  }, [count, itemSize, radius]);

  return (
    <bufferGeometry>
      <bufferAttribute
        attach='attributes-position'
        count={count}
        itemSize={itemSize}
        array={array}
      />
    </bufferGeometry>
  );
}
