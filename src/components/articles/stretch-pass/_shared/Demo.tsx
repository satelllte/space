import clsx from 'clsx';
import {CLASS_NAME_MDX_CODE_SPACING} from '../../../ui/mdx/constants';

type DemoProps = {
  children: React.ReactNode;
  'aria-label'?: string;
};

export function Demo({children, ...rest}: DemoProps) {
  return (
    <figure
      className={clsx(
        CLASS_NAME_MDX_CODE_SPACING,
        'tw:rounded-lg tw:border tw:border-gray-5 tw:bg-gray-2 tw:p-4',
      )}
      {...rest}
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
    <div className='tw:mt-4 tw:grid tw:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] tw:gap-x-5 tw:gap-y-3'>
      {children}
    </div>
  );
}

type DemoCaptionProps = {
  children: React.ReactNode;
};

export function DemoCaption({children}: DemoCaptionProps) {
  return (
    <figcaption className='tw:mt-4 tw:text-center tw:text-sm tw:text-gray-11'>
      {children}
    </figcaption>
  );
}
