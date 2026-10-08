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
      <ol className='flex flex-col items-stretch gap-1.5 font-mono text-xs md:flex-row md:items-center'>
        {PASSES.map(({name, variant}, index) => (
          <li
            key={name}
            className='flex flex-auto flex-col items-center gap-1.5 md:flex-row'
          >
            <div
              className={clsx(
                'flex min-h-12 w-full flex-col items-center justify-center rounded-md border px-2 py-1.5 text-center',
                variant === undefined && 'border-gray-6 bg-gray-3 text-gray-12',
                variant === 'highlighted' &&
                  'border-dashed border-gray-10 bg-gray-3 text-gray-12',
                variant === 'output' &&
                  'border-dashed border-gray-7 text-gray-11',
              )}
            >
              {name}
            </div>
            {index < PASSES.length - 1 && (
              <span aria-hidden='true' className='text-gray-9'>
                <span className='md:hidden'>↓</span>
                <span className='hidden md:inline'>→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <DemoCaption>
        Each pass renders into a texture. The stretch pass reads the previous
        output as <code className='font-mono'>tDiffuse</code>.
      </DemoCaption>
    </Demo>
  );
}
