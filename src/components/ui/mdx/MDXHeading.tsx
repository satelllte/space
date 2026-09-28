import clsx from 'clsx';
import {HeadlessLink} from '../headless/HeadlessLink';

type MDXHeadingProps = {
  id?: string;
  children: React.ReactNode;
};

export function MDXHeadingH2(props: MDXHeadingProps) {
  return (
    <Heading
      data-slot='mdx-heading-h2'
      as='h2'
      className='mt-12 text-2xl leading-[1.3]'
      {...props}
    />
  );
}

export function MDXHeadingH3(props: MDXHeadingProps) {
  return (
    <Heading
      data-slot='mdx-heading-h3'
      as='h3'
      className='mt-9 text-xl leading-[1.4]'
      {...props}
    />
  );
}

function Heading({
  id,
  children,
  'data-slot': dataSlot,
  as: Tag,
  className,
}: MDXHeadingProps & {
  'data-slot': string;
  as: 'h2' | 'h3';
  className: string;
}) {
  return (
    <Tag
      data-slot={dataSlot}
      id={id}
      className={clsx(
        'scroll-mt-8 text-balance font-semibold tracking-[-0.01em] text-gray-12',
        className,
      )}
    >
      {id ? (
        <HeadlessLink
          href={`#${id}`}
          className='group relative outline-none [color:inherit] focus-visible:decoration-gray-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-8'
        >
          <span
            className='absolute right-full pr-2 text-gray-9 opacity-0 transition-opacity duration-150 ease-[ease] group-hover:opacity-100 group-focus-visible:opacity-100'
            aria-hidden='true'
          >
            #
          </span>
          {children}
        </HeadlessLink>
      ) : (
        children
      )}
    </Tag>
  );
}
