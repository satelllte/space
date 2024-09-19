import {OrbitControls} from '@react-three/drei';
import {Theme} from '../../../context/Theme';
import {Canvas} from '../_shared/Canvas';
import {SceneLayout} from '../_shared/SceneLayout';
import {Environment} from './Environment';
import {Lighting} from './Lighting';
import {TransmissionObject} from './TransmissionObject';

export function SceneTransmission() {
  return (
    <Theme>
      <SceneLayout>
        <Canvas camera={{position: [0.0, 0.0, 3.4]}}>
          <OrbitControls
            enablePan={false}
            minDistance={1.5}
            maxDistance={5.6}
            zoomSpeed={0.18}
            rotateSpeed={0.53}
            dampingFactor={0.0125}
          />
          <Lighting />
          <Environment />
          <TransmissionObject />
        </Canvas>
      </SceneLayout>
    </Theme>
  );
}
