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
