import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {MeshTransmissionMaterial} from '@react-three/drei';

export function TransmissionObject() {
  const meshRef = useRef<React.ElementRef<'mesh'>>(null);
  // const scroll = useScroll();
  // const viewport = useThree((three) => three.viewport);
  console.debug('scroll: ', scroll);

  useFrame((_, timeDelta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.y += timeDelta * 0.11;
    mesh.rotation.z += timeDelta * 0.03;
    // mesh.position.y = Math.sin(clock.elapsedTime * 2.0) * 0.5;

    // mesh.rotation.y = scroll.offset
    // console.debug('scroll.offset: ', scroll.offset);
    // mesh.position.y = viewport.height * scroll.offset;
    // mesh.rotation.z = scroll.offset;
    // mesh.scale.x = 1.0 + scroll.offset;
    // mesh.scale.y = 1.0 + scroll.offset;
    // mesh.scale.z = 1.0 + scroll.offset;
  });

  return (
    <mesh ref={meshRef}>
      {/* <torusKnotGeometry args={[1.1, 0.4, 72, 16]} /> */}
      <sphereGeometry args={[1.0, 64, 64]} />
      {/* <boxGeometry /> */}
      {/* <tetrahedronGeometry /> */}
      <MeshTransmissionMaterial
        // wireframe
        // transmission={1.2}
        thickness={0.1}
        chromaticAberration={0.2}
        backside
        samples={4}
        distortion={10200.8}
        roughness={10.0}
        resolution={8.0}
        backsideResolution={4.0}
      />
    </mesh>
  );
}
