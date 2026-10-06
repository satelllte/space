import clsx from 'clsx';
import {Button} from '../Button';

type MDXCodeProps = {
  children: React.ReactNode;
};

export function MDXCode({children}: MDXCodeProps) {
  return (
    <code
      data-slot='mdx-code'
      className='font-mono mdx-code-inline:rounded-sm mdx-code-inline:border mdx-code-inline:border-gray-5 mdx-code-inline:bg-gray-3 mdx-code-inline:px-1 mdx-code-inline:py-0.5 mdx-code-inline:text-sm mdx-code-in-h2:text-lg mdx-code-in-h3:text-base'
    >
      {children}
    </code>
  );
}

type MDXCodeBlockProps = {
  children: React.ReactNode;
  'data-file'?: string;
  'data-language'?: string;
};

export function MDXCodeBlock({
  children,
  'data-file': file,
  'data-language': language = 'txt',
}: MDXCodeBlockProps) {
  return (
    <figure
      data-slot='mdx-code-block'
      data-language={language}
      className='mt-6 grid grid-cols-[minmax(0,1fr)_auto] rounded-lg border border-gray-5 bg-gray-2 [&+*]:mt-6'
    >
      {file && (
        <figcaption className='col-start-1 row-start-1 flex min-h-10 items-center truncate border-b border-gray-5 pl-4 font-mono text-xs text-gray-11'>
          {file}
        </figcaption>
      )}
      <div
        className={clsx(
          'row-start-1 flex min-h-10 items-center justify-end gap-3 border-b border-gray-5 pr-2 font-mono text-xs text-gray-11',
        )}
      >
        <Button
          data-copy-code
          hidden
          size='xs'
          aria-label={`Copy ${file ?? language} code`}
        >
          Copy
        </Button>
      </div>
      <pre
        tabIndex={0} // make scrollable region keyboard accessible
        role='group'
        aria-label={`${file ?? language} code`}
        className='col-span-2 row-start-2 m-0 overflow-x-auto rounded-b-lg p-4 font-mono text-xs leading-[1.7] text-gray-12 outline-none [tab-size:2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-8'
      >
        {children}
      </pre>
    </figure>
  );
}
