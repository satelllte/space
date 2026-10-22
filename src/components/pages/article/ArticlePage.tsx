import {useId} from 'react';
import {Link} from '../../ui/Link';
import {Header} from '../../ui/layout/Header';
import {LayoutDefault} from '../../ui/layout/LayoutDefault';
import {Tags} from '../../ui/Tags';
import {ThemeToggle} from '../../ui/ThemeToggle';
import {CopyCodeHandler} from './CopyCodeHandler';

type ArticleHeading = {
  depth: number;
  slug: string;
  text: string;
};

type ArticlePageProps = {
  title: string;
  description: string;
  publishedAt: Date;
  tags: string[];
  headings: ArticleHeading[];
  children: React.ReactNode;
};

export function ArticlePage({
  title,
  description,
  publishedAt,
  tags,
  headings,
  children,
}: ArticlePageProps) {
  const titleId = useId();
  return (
    <LayoutDefault>
      <Header>
        <nav aria-label='Primary'>
          <Link size='xs' href='/'>
            Home
          </Link>
        </nav>
      </Header>
      <div className='tw:grow tw:pb-16 tw:xl:grid tw:xl:grid-cols-[1fr_minmax(0,40rem)_1fr] tw:xl:gap-12'>
        <TableOfContents headings={headings} />
        <main className='tw:mx-auto tw:w-full tw:max-w-160 tw:xl:col-start-2'>
          <article aria-labelledby={titleId}>
            <header className='tw:mb-12 tw:flex tw:flex-col tw:gap-4'>
              <p className='tw:text-gray-11 tw:text-sm'>
                <time dateTime={publishedAt.toISOString()}>
                  {formatDate(publishedAt)}
                </time>
              </p>
              <h1
                id={titleId}
                className='tw:text-balance tw:font-semibold tw:text-3xl tw:text-gray-12 tw:leading-tight tw:tracking-tight tw:sm:text-4xl/10'
              >
                {title}
              </h1>
              <p className='tw:text-gray-11 tw:text-lg tw:leading-relaxed'>
                {description}
              </p>
              {tags.length > 0 && <Tags tags={tags} />}
            </header>
            <div className='tw:wrap-break-word tw:text-base tw:text-gray-12'>
              {children}
            </div>
          </article>
        </main>
      </div>
      <footer>
        <ThemeToggle />
      </footer>
      <CopyCodeHandler />
    </LayoutDefault>
  );
}

function TableOfContents({headings}: {headings: ArticleHeading[]}) {
  const labelId = useId();
  const items = nestHeadings(headings);
  if (items.length === 0) return null;
  return (
    <aside className='tw:hidden tw:xl:col-start-3 tw:xl:row-start-1 tw:xl:block'>
      <nav
        aria-labelledby={labelId}
        className='tw:sticky tw:top-12 tw:max-w-[16rem]'
      >
        <p
          id={labelId}
          className='tw:mb-3 tw:font-medium tw:text-gray-12 tw:text-xs'
        >
          On this page
        </p>
        <TableOfContentsList items={items} />
      </nav>
    </aside>
  );
}

function TableOfContentsList({items}: {items: TableOfContentsItem[]}) {
  return (
    <ul className='tw:flex tw:flex-col tw:gap-2'>
      {items.map(({heading, children}) => (
        <li key={heading.slug}>
          <a
            href={`#${heading.slug}`}
            className='tw:text-gray-11 tw:text-xs tw:outline-hidden tw:hover:text-gray-12 tw:focus-visible:outline-2 tw:focus-visible:outline-gray-8 tw:focus-visible:outline-solid tw:focus-visible:outline-offset-2'
          >
            {heading.text}
          </a>
          {children.length > 0 && (
            <div className='tw:mt-2 tw:pl-3'>
              <TableOfContentsList items={children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

type TableOfContentsItem = {
  heading: ArticleHeading;
  children: TableOfContentsItem[];
};

function nestHeadings(headings: ArticleHeading[]): TableOfContentsItem[] {
  const items: TableOfContentsItem[] = [];
  for (const heading of headings) {
    if (heading.depth === 2) {
      items.push({heading, children: []});
    } else if (heading.depth === 3) {
      items.at(-1)?.children.push({heading, children: []});
    }
  }

  return items;
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

const formatDate = (date: Date): string => dateFormat.format(date);
