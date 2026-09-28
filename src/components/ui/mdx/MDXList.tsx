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
      className='mt-4 flex list-decimal flex-col gap-0.5 pl-6'
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
      className='mt-4 flex list-disc flex-col gap-0.5 pl-6'
    >
      {children}
    </ul>
  );
}
