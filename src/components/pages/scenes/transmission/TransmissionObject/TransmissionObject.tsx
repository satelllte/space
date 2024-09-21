import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {MeshTransmissionMaterial} from '@react-three/drei';

type TransmissionObjectProps = {
  snapshot: boolean;
};

export function TransmissionObject({snapshot}: TransmissionObjectProps) {
  const meshRef = useRef<React.ElementRef<'mesh'>>(null);

  useFrame((_, timeDelta) => {
    if (snapshot) return;

    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.y += timeDelta * 0.11;
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
