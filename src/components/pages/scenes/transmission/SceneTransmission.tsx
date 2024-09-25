import {Theme} from '../../../context/Theme';
import {SceneLayout} from '../_shared/SceneLayout';
import {Canvas} from '../_shared/Canvas';
import {OrbitControls} from '../_shared/OrbitControls';
import {Environment} from './Environment';
import {Lighting} from './Lighting';
import {TransmissionObject} from './TransmissionObject';
import {Scroll, ScrollControls} from '@react-three/drei';

export function SceneTransmission() {
  return (
    <Theme>
      <SceneLayout>
        <Canvas
          camera={{position: [0.0, 0.0, 1.7]}}
          // style={{filter: 'grayscale(1.0)'}}
        >
          <OrbitControls minDistance={1.7} maxDistance={1.7} />
          <Lighting />
          <Environment />
          <mesh position={[0.0, 0.0, 0.0]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshPhysicalMaterial color={0xff0000} />
          </mesh>
          <TransmissionObject />
          {/* <ScrollControls pages={2} damping={0.1}>
            <Scroll>
              <TransmissionObject />
            </Scroll>
          </ScrollControls> */}
        </Canvas>
      </SceneLayout>
    </Theme>
  );
}
