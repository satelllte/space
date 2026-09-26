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
