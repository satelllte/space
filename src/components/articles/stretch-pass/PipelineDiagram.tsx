import clsx from 'clsx';
import {Demo, DemoCaption} from './_shared/Demo';

type Pass = {
  name: string;
  variant?: 'highlighted' | 'output';
};

const PASSES: Pass[] = [
  {name: 'RenderPass'},
  {name: 'UnrealBloomPass'},
  {name: 'StretchPass', variant: 'highlighted'},
  {name: 'screen', variant: 'output'},
];

export function PipelineDiagram() {
  return (
    <Demo aria-label='Render pipeline'>
      <ol className='tw:flex tw:flex-col tw:items-stretch tw:gap-1.5 tw:font-mono tw:text-xs tw:md:flex-row tw:md:items-center'>
        {PASSES.map(({name, variant}, index) => (
          <li
            key={name}
            className='tw:flex tw:flex-auto tw:flex-col tw:items-center tw:gap-1.5 tw:md:flex-row'
          >
            <div
              className={clsx(
                'tw:flex tw:min-h-12 tw:w-full tw:flex-col tw:items-center tw:justify-center tw:rounded-md tw:border tw:px-2 tw:py-1.5 tw:text-center',
                variant === undefined &&
                  'tw:border-gray-6 tw:bg-gray-3 tw:text-gray-12',
                variant === 'highlighted' &&
                  'tw:border-dashed tw:border-gray-10 tw:bg-gray-3 tw:text-gray-12',
                variant === 'output' &&
                  'tw:border-dashed tw:border-gray-7 tw:text-gray-11',
              )}
            >
              {name}
            </div>
            {index < PASSES.length - 1 && (
              <span aria-hidden='true' className='tw:text-gray-9'>
                <span className='tw:md:hidden'>↓</span>
                <span className='tw:hidden tw:md:inline'>→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <DemoCaption>
        Each pass renders into a texture. The stretch pass reads the previous
        output as <code className='tw:font-mono'>tDiffuse</code>.
      </DemoCaption>
    </Demo>
  );
}
