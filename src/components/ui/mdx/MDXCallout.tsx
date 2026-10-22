import clsx from 'clsx';
import {CLASS_NAME_MDX_BASE_SPACING} from './constants';

type MDXCalloutProps = {
  title?: string;
  children: React.ReactNode;
};

export function MDXCallout({title = 'Note', children}: MDXCalloutProps) {
  return (
    <div
      data-slot='mdx-callout'
      role='note'
      className={clsx(
        CLASS_NAME_MDX_BASE_SPACING,
        'tw:rounded-r-md tw:border-l-2 tw:border-l-gray-8 tw:bg-gray-2 tw:px-5 tw:py-4',
      )}
    >
      <p className='tw:mb-1 tw:font-semibold tw:text-gray-11 tw:text-xs tw:uppercase tw:tracking-wider'>
        {title}
      </p>
      <div className='tw:*:not-first:mt-3'>{children}</div>
    </div>
  );
}
