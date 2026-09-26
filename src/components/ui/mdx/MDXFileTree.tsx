type MDXFileTreeProps = {
  label: string;
  children: React.ReactNode;
};

export function MDXFileTree({label, children}: MDXFileTreeProps) {
  return (
    <figure
      data-slot='mdx-file-tree'
      aria-label={label}
      className='mt-4 overflow-x-auto rounded-lg border border-gray-5 bg-gray-2 px-5 py-4 font-mono text-[0.8125rem] leading-[1.7] text-gray-11 [&_code]:text-gray-12 [&_li]:whitespace-nowrap [&_ul]:mt-0 [&_ul]:list-none [&_ul]:gap-0 [&_ul]:pl-0 [&_ul_ul]:ml-1 [&_ul_ul]:pl-5'
    >
      {children}
    </figure>
  );
}
