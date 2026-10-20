import clsx from 'clsx';
import {Button} from '../Button';
import {CLASS_NAME_MDX_CODE_SPACING} from './constants';

type MDXCodeProps = {
  children: React.ReactNode;
};

export function MDXCode({children}: MDXCodeProps) {
  return (
    <code
      data-slot='mdx-code'
      className='tw:font-mono tw:mdx-code-inline:rounded-xs tw:mdx-code-inline:border tw:mdx-code-inline:border-gray-5 tw:mdx-code-inline:bg-gray-3 tw:mdx-code-inline:px-1 tw:mdx-code-inline:py-0.5 tw:mdx-code-inline:text-sm tw:mdx-code-in-h2:text-lg tw:mdx-code-in-h3:text-base'
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
      className={clsx(
        CLASS_NAME_MDX_CODE_SPACING,
        'tw:grid tw:grid-cols-[minmax(0,1fr)_auto] tw:rounded-lg tw:border tw:border-gray-5 tw:bg-gray-2',
      )}
    >
      {file && (
        <figcaption className='tw:col-start-1 tw:row-start-1 tw:flex tw:min-h-10 tw:items-center tw:truncate tw:border-b tw:border-gray-5 tw:pl-4 tw:font-mono tw:text-xs tw:text-gray-11'>
          {file}
        </figcaption>
      )}
      <div
        className={clsx(
          'tw:row-start-1 tw:flex tw:min-h-10 tw:items-center tw:justify-end tw:gap-3 tw:border-b tw:border-gray-5 tw:pr-2 tw:font-mono tw:text-xs tw:text-gray-11',
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
        className='tw:col-span-2 tw:row-start-2 tw:m-0 tw:overflow-x-auto tw:rounded-b-lg tw:p-4 tw:font-mono tw:text-xs tw:leading-[1.7] tw:tab-2 tw:text-gray-12 tw:outline-hidden tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-gray-8 tw:focus-visible:outline-solid'
      >
        {children}
      </pre>
    </figure>
  );
}
