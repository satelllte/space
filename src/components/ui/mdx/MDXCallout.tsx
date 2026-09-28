type MDXCalloutProps = {
  title?: string;
  children: React.ReactNode;
};

export function MDXCallout({title = 'Note', children}: MDXCalloutProps) {
  return (
    <div
      data-slot='mdx-callout'
      role='note'
      className='mt-4 rounded-r-md border-l-2 border-l-gray-8 bg-gray-2 px-5 py-4'
    >
      <p className='mb-1 text-xs font-semibold uppercase tracking-wider text-gray-11'>
        {title}
      </p>
      <div className='space-y-3'>{children}</div>
    </div>
  );
}
