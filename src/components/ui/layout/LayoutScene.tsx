import clsx from 'clsx';
import {Theme} from '../../context/Theme';
import {Link} from '../Link';
import {CLASS_NAME_PAGE_SPACING_FIXED} from './constants';

type LayoutSceneProps = {
  title: string;
  children: React.ReactNode;
};

export function LayoutScene({title, children}: LayoutSceneProps) {
  return (
    <Theme>
      <main className='h-full w-full'>
        <h1 className='sr-only'>{title}</h1>
        <noscript>
          <div className='fixed z-10 flex h-full w-full items-center justify-center'>
            <p className='text-gray-12'>
              {
                'Cannot display the scene because JavaScript is disabled in this browser :('
              }
            </p>
          </div>
        </noscript>
        {children}
      </main>

      <footer
        className={clsx(
          CLASS_NAME_PAGE_SPACING_FIXED,
          'fixed z-20 flex items-end',
        )}
      >
        <div // this extra div is required for the link to stay in line with LayoutDefault.tsx
        >
          <Link size='xs' href='/' aria-label='Go back'>
            {`<- Back`}
          </Link>
        </div>
      </footer>
    </Theme>
  );
}
