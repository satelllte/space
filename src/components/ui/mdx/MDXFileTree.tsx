import clsx from 'clsx';
import {CLASS_NAME_MDX_BASE_SPACING} from './constants';

type MDXFileTreeProps = {
  label: string;
  children: React.ReactNode;
};

export function MDXFileTree({label, children}: MDXFileTreeProps) {
  return (
    <figure
      data-slot='mdx-file-tree'
      aria-label={label}
      className={clsx(
        CLASS_NAME_MDX_BASE_SPACING,
        'tw:overflow-x-auto tw:rounded-lg tw:border tw:border-gray-5 tw:bg-gray-2 tw:px-5 tw:py-4 tw:font-mono tw:text-gray-11 tw:text-xs tw:leading-[1.7] tw:[&_code]:text-gray-12 tw:[&_li]:whitespace-nowrap tw:[&_ul]:mt-0 tw:[&_ul]:list-none tw:[&_ul]:gap-0 tw:[&_ul]:pl-0 tw:[&_ul_ul]:ml-1 tw:[&_ul_ul]:pl-5',
      )}
    >
      {children}
    </figure>
  );
}
