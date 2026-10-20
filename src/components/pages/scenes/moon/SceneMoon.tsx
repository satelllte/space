import {Suspense} from 'react';
import {LayoutScene} from '../../../ui/layout/LayoutScene';
import {Canvas} from '../_shared/Canvas';
import {Moon} from './Moon';

export function SceneMoon() {
  return (
    <LayoutScene title='Moon'>
      <div className='tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center'>
        <div className='tw:relative tw:aspect-square tw:h-[50vh]'>
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
