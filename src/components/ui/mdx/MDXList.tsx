import clsx from 'clsx';
import {CLASS_NAME_MDX_BASE_SPACING} from './constants';

const CLASS_NAMES_MDX_LIST_BASE = clsx(
  CLASS_NAME_MDX_BASE_SPACING,
  'flex flex-col gap-0.5 pl-6',
);

type MDXListItemProps = {
  children: React.ReactNode;
};

export function MDXListItem({children}: MDXListItemProps) {
  return (
    <li data-slot='mdx-list-item' className='marker:text-gray-9'>
      {children}
    </li>
  );
}

type MDXListOrderedProps = {
  children: React.ReactNode;
};

export function MDXListOrdered({children}: MDXListOrderedProps) {
  return (
    <ol
      data-slot='mdx-list-ordered'
      className={clsx(CLASS_NAMES_MDX_LIST_BASE, 'list-decimal')}
    >
      {children}
    </ol>
  );
}

type MDXListUnorderedProps = {
  children: React.ReactNode;
};

export function MDXListUnordered({children}: MDXListUnorderedProps) {
  return (
    <ul
      data-slot='mdx-list-unordered'
      className={clsx(CLASS_NAMES_MDX_LIST_BASE, 'list-disc')}
    >
      {children}
    </ul>
  );
}
