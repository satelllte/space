import {OrbitControls} from '@react-three/drei';
import {Theme} from '../../../context/Theme';
import {Canvas} from '../_shared/Canvas';
import {SceneLayout} from '../_shared/SceneLayout';
import {Particles} from './Particles';

export function SceneParticles() {
  return (
    <Theme>
      <SceneLayout>
        <Canvas camera={{position: [0.0, 0.0, 2.4]}}>
          <OrbitControls
            enablePan={false}
            autoRotateSpeed={0.5}
            minDistance={1.5}
            maxDistance={2.6}
            zoomSpeed={0.18}
            rotateSpeed={0.33}
            dampingFactor={0.0125}
          />
          <Particles />
        </Canvas>
      </SceneLayout>
    </Theme>
  );
}
