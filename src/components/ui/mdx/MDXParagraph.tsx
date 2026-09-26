type MDXParagraphProps = {
  children: React.ReactNode;
};

export function MDXParagraph({children}: MDXParagraphProps) {
  return (
    <p data-slot='mdx-paragraph' className='mt-4'>
      {children}
    </p>
  );
}
