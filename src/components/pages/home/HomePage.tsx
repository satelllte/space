import {useId} from 'react';
import {Theme} from '../../context/Theme';
import {IconCircle} from '../../icons/IconCircle';
import {Link, LinkIcon} from '../../ui/Link';
import {ThemeToggle} from './ThemeToggle';
import {ConsoleMessage} from './ConsoleMessage';

export function HomePage() {
  return (
    <Theme>
      <div className='flex min-h-full flex-col px-4 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-12'>
        <header className='flex-shrink-0 flex-grow-0 pb-12'>
          <LinkIcon
            aria-label='GitHub repository'
            external
            href='https://github.com/satelllte/space'
          >
            <IconCircle />
          </LinkIcon>
        </header>
        <main className='flex flex-grow flex-col gap-12 pb-16'>
          <MainContent />
        </main>
        <footer className='flex-shrink-0 flex-grow-0'>
          <ThemeToggle />
        </footer>
      </div>
      <ConsoleMessage />
    </Theme>
  );
}

function MainContent() {
  const titleIdScenes = useId();
  const titleIdMore = useId();
  return (
    <>
      <Section>
        <SectionTitle id={titleIdScenes}>Scenes</SectionTitle>
        <List labelledBy={titleIdScenes}>
          <ListItem>
            <Link href='/scenes/moon'>Moon</Link>
          </ListItem>
          <ListItem>
            <Link href='/scenes/particles'>Particles</Link>
          </ListItem>
          <ListItem>
            <Link href='/scenes/transmission'>Transmission</Link>
          </ListItem>
        </List>
      </Section>
      <Section>
        <SectionTitle id={titleIdMore}>More</SectionTitle>
        <List labelledBy={titleIdMore}>
          <ListItem>
            <Link external href='https://github.com/satelllte'>
              GitHub
            </Link>
          </ListItem>
          <ListItem>
            <Link external href='https://unsplash.com/@satelllte'>
              Unsplash
            </Link>
          </ListItem>
        </List>
      </Section>
    </>
  );
}

function Section({children}: {children: React.ReactNode}) {
  return <div className='flex flex-col gap-2'>{children}</div>;
}

function SectionTitle({id, children}: {id: string; children: React.ReactNode}) {
  return (
    <h2 id={id} className='text-xl text-gray-12'>
      {children}
    </h2>
  );
}

function List({
  labelledBy,
  children,
}: {
  labelledBy: string;
  children: React.ReactNode;
}) {
  return (
    <ul aria-labelledby={labelledBy} className='flex flex-col gap-1'>
      {children}
    </ul>
  );
}

function ListItem({children}: {children: React.ReactNode}) {
  return <li>{children}</li>;
}
