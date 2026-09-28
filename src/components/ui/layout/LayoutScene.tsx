import {Theme} from '../../context/Theme';
import {Link} from '../Link';

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

      <footer className='fixed bottom-6 left-4 right-4 z-20 flex items-end sm:bottom-8 sm:left-8 sm:right-8'>
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
