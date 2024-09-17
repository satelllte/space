import {useRef} from 'react';
import {useFrame, useLoader, useThree} from '@react-three/fiber';
import {TextureLoader} from 'three';
import {degToRad} from 'three/src/math/MathUtils.js';

export function Cube() {
  const meshRef = useRef<React.ElementRef<'mesh'>>(null);

  useFrame(({clock}) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.x = clock.elapsedTime * 0.0101;
    mesh.rotation.y = clock.elapsedTime * 0.3801;
    mesh.rotation.z = clock.elapsedTime * 0.2011;
  });

  return (
    <mesh
      ref={meshRef}
      position={[0.0, 0.15, 0.0]}
      rotation={[degToRad(42.0), degToRad(-15.0), degToRad(-31.0)]}
    >
      <boxGeometry />
      <CubeMaterial />
    </mesh>
  );
}

function CubeMaterial() {
  const gl = useThree((state) => state.gl);
  const anisotropy = gl.capabilities.getMaxAnisotropy();

  const [map, normalMap, ormMap] = useLoader(TextureLoader, [
    '/assets/textures/pitted_metal/pitted_metal_basecolor.jpg',
    '/assets/textures/pitted_metal/pitted_metal_normal.jpg',
    '/assets/textures/pitted_metal/pitted_metal_orm.jpg',
  ]);

  if (map) map.anisotropy = anisotropy;
  if (normalMap) normalMap.anisotropy = anisotropy;
  if (ormMap) ormMap.anisotropy = anisotropy;

  return (
    <meshStandardMaterial
      color={0xaaaaaa}
      metalness={0.0}
      roughness={0.9}
      map={map ?? null}
      metalnessMap={ormMap ?? null}
      roughnessMap={ormMap ?? null}
      aoMap={ormMap ?? null}
      normalMap={normalMap ?? null}
      flatShading
    />
  );
}
