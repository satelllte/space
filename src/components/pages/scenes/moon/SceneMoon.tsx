import {Suspense} from 'react';
import {LayoutScene} from '../../../ui/layout/LayoutScene';
import {Canvas} from '../_shared/Canvas';
import {Moon} from './Moon';

export function SceneMoon() {
  return (
    <LayoutScene>
      <div className='flex h-full w-full items-center justify-center'>
        <div className='relative aspect-square h-[50vh]'>
          <Canvas>
            <Suspense>
              <Moon />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </LayoutScene>
  );
}
