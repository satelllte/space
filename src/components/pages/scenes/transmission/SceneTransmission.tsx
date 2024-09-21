import {Theme} from '../../../context/Theme';
import {SceneLayout} from '../_shared/SceneLayout';
import {Canvas} from '../_shared/Canvas';
import {OrbitControls} from '../_shared/OrbitControls';
import {Environment} from './Environment';
import {Lighting} from './Lighting';
import {TransmissionObject} from './TransmissionObject';

type SceneTransmissionProps = {
  snapshot?: boolean;
};

export function SceneTransmission({snapshot = false}: SceneTransmissionProps) {
  return (
    <Theme>
      <SceneLayout>
        <Canvas camera={{position: [0.0, 0.0, 3.4]}}>
          {!snapshot && <OrbitControls />}
          <Lighting />
          <Environment />
          <TransmissionObject snapshot={snapshot} />
        </Canvas>
      </SceneLayout>
    </Theme>
  );
}
