import clsx from 'clsx';
import {CLASS_NAME_MDX_CODE_SPACING} from '../../../ui/mdx/constants';

type DemoProps = {
  children: React.ReactNode;
};

export function Demo({children}: DemoProps) {
  return (
    <figure
      className={clsx(
        CLASS_NAME_MDX_CODE_SPACING,
        'rounded-lg border border-gray-5 bg-gray-2 p-4',
      )}
    >
      {children}
    </figure>
  );
}

type DemoControlsProps = {
  children: React.ReactNode;
};

export function DemoControls({children}: DemoControlsProps) {
  return (
    <div className='mt-4 grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-x-5 gap-y-3'>
      {children}
    </div>
  );
}

type DemoCaptionProps = {
  children: React.ReactNode;
};

export function DemoCaption({children}: DemoCaptionProps) {
  return (
    <figcaption className='mt-4 text-center text-sm text-gray-11'>
      {children}
    </figcaption>
  );
}
