type MDXParagraphProps = {
  children: React.ReactNode;
};

export function MDXParagraph({children}: MDXParagraphProps) {
  return (
    <p data-slot='mdx-paragraph' className='tw:mt-4'>
      {children}
    </p>
  );
}
