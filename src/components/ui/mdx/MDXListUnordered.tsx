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
