import {LayoutScene} from '../../../ui/layout/LayoutScene';
import {Canvas} from '../_shared/Canvas';
import {OrbitControls} from '../_shared/OrbitControls';
import {Particles} from './Particles';

export function SceneParticles() {
  return (
    <LayoutScene>
      <Canvas camera={{position: [0.0, 0.0, 2.4]}}>
        <OrbitControls
          autoRotateSpeed={0.5}
          maxDistance={2.6}
          rotateSpeed={0.4}
        />
        <Particles />
      </Canvas>
    </LayoutScene>
  );
}
