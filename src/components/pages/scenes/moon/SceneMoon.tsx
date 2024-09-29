import {Theme} from '../../../context/Theme';
import {SceneLayout} from '../_shared/SceneLayout';
import {Canvas} from '../_shared/Canvas';
import {Moon} from './Moon';

export function SceneMoon() {
  return (
    <Theme>
      <SceneLayout>
        <div className='flex h-full w-full items-center justify-center'>
          <Canvas className='max-h-[500px] max-w-[500px]'>
            <Moon />
          </Canvas>
        </div>
      </SceneLayout>
    </Theme>
  );
}
