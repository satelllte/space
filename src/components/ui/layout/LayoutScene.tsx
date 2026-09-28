import clsx from 'clsx';
import {Theme} from '../../context/Theme';
import {Link} from '../Link';
import {CLASS_NAME_PAGE_SPACING_FIXED} from './constants';

type LayoutSceneProps = {
  children: React.ReactNode;
};

export function LayoutScene({children}: LayoutSceneProps) {
  return (
    <Theme>
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

      <footer
        className={clsx(
          CLASS_NAME_PAGE_SPACING_FIXED,
          'fixed z-20 flex items-end',
        )}
      >
        <div /* This extra div is required for the link to be aligned the same way it appears on homepage */
        >
          <Link size='xs' href='/' aria-label='Go back'>
            {`<- Back`}
          </Link>
        </div>
      </footer>
    </Theme>
  );
}
