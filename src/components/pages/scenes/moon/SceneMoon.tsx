import {Suspense} from 'react';
import {Theme} from '../../../context/Theme';
import {SceneLayout} from '../_shared/SceneLayout';
import {Canvas} from '../_shared/Canvas';
import {Moon} from './Moon';

export function SceneMoon() {
  return (
    <Theme>
      <SceneLayout>
        <div className='flex h-full w-full items-center justify-center'>
          <div className='relative aspect-square h-[50vh]'>
            <Canvas>
              <Suspense>
                <Moon />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </SceneLayout>
    </Theme>
  );
}
