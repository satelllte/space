import {Theme} from '../../../context/Theme';
import {SceneLayout} from '../_shared/SceneLayout';
import {Canvas} from '../_shared/Canvas';
import {OrbitControls} from '../_shared/OrbitControls';
import {Environment} from './Environment';
import {Lighting} from './Lighting';
import {TransmissionObject} from './TransmissionObject';

export function SceneTransmission() {
  return (
    <Theme>
      <SceneLayout>
        <Canvas camera={{position: [0.0, 0.0, 3.4]}}>
          <OrbitControls />
          <Lighting />
          <Environment />
          <TransmissionObject />
        </Canvas>
      </SceneLayout>
    </Theme>
  );
}
