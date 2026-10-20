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
      className='tw:mt-12 tw:text-2xl tw:leading-[1.3]'
      {...props}
    />
  );
}

export function MDXHeadingH3(props: MDXHeadingProps) {
  return (
    <Heading
      data-slot='mdx-heading-h3'
      as='h3'
      className='tw:mt-9 tw:text-xl tw:leading-[1.4]'
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
        'tw:scroll-mt-8 tw:font-semibold tw:tracking-[-0.01em] tw:text-balance tw:text-gray-12',
        className,
      )}
    >
      {id ? (
        <HeadlessLink
          href={`#${id}`}
          className='tw:group tw:relative tw:text-inherit tw:outline-hidden tw:focus-visible:decoration-gray-8 tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4 tw:focus-visible:outline-gray-8 tw:focus-visible:outline-solid'
        >
          <span
            className='tw:absolute tw:right-full tw:pr-2 tw:text-gray-9 tw:opacity-0 tw:transition-opacity tw:duration-150 tw:ease-[ease] tw:group-hover:opacity-100 tw:group-focus-visible:opacity-100'
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
