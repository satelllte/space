import {useId} from 'react';
import {Link} from '../../ui/Link';
import {Theme} from '../../context/Theme';
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
    <Theme>
      <div className='flex min-h-full flex-col px-4 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-12'>
        <header className='flex-shrink-0 flex-grow-0 pb-12'>
          <nav aria-label='Primary'>
            <Link size='xs' href='/'>
              Home
            </Link>
          </nav>
        </header>
        <div className='flex-grow pb-16 xl:grid xl:grid-cols-[1fr_minmax(0,40rem)_1fr] xl:gap-12'>
          <TableOfContents headings={headings} />
          <main className='mx-auto w-full max-w-[40rem] xl:col-start-2'>
            <article aria-labelledby={titleId}>
              <header className='mb-12 flex flex-col gap-4'>
                <p className='text-sm text-gray-11'>
                  <time dateTime={publishedAt.toISOString()}>
                    {formatDate(publishedAt)}
                  </time>
                </p>
                <h1
                  id={titleId}
                  className='text-balance text-3xl font-semibold leading-tight tracking-tight text-gray-12 sm:text-4xl'
                >
                  {title}
                </h1>
                <p className='text-lg leading-relaxed text-gray-11'>
                  {description}
                </p>
                {tags.length > 0 && (
                  <ul aria-label='Tags' className='flex flex-wrap gap-2'>
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className='rounded-full border border-gray-5 px-2.5 py-0.5 text-xs text-gray-11'
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </header>
              <div className='--article-content break-words text-base text-gray-12'>
                {children}
              </div>
            </article>
          </main>
        </div>
        <footer>
          <ThemeToggle />
        </footer>
      </div>
      <CopyCodeHandler />
    </Theme>
  );
}

function TableOfContents({headings}: {headings: ArticleHeading[]}) {
  const labelId = useId();
  const items = nestHeadings(headings);
  if (items.length === 0) return null;
  return (
    <aside className='hidden xl:col-start-3 xl:row-start-1 xl:block'>
      <nav aria-labelledby={labelId} className='sticky top-12 max-w-[16rem]'>
        <p id={labelId} className='mb-3 text-xs font-medium text-gray-12'>
          On this page
        </p>
        <TableOfContentsList items={items} />
      </nav>
    </aside>
  );
}

function TableOfContentsList({items}: {items: TableOfContentsItem[]}) {
  return (
    <ul className='flex flex-col gap-2'>
      {items.map(({heading, children}) => (
        <li key={heading.slug}>
          <a
            href={`#${heading.slug}`}
            className='text-xs text-gray-11 outline-none hover:text-gray-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-8'
          >
            {heading.text}
          </a>
          {children.length > 0 && (
            <div className='mt-2 pl-3'>
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
