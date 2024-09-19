import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {MeshTransmissionMaterial} from '@react-three/drei';

export function TransmissionObject() {
  const meshRef = useRef<React.ElementRef<'mesh'>>(null);

  useFrame((_, timeDelta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.y += timeDelta * -0.21;
    mesh.rotation.y += timeDelta * 0.31;
    mesh.rotation.z += timeDelta * 0.03;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <MeshTransmissionMaterial
        thickness={0.2}
        chromaticAberration={0.9}
        backside
        samples={4}
        distortion={0.8}
        roughness={0.1}
      />
    </mesh>
  );
}
