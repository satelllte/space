import {Link} from '../../../../ui/Link';
import {VisuallyHidden} from '../../../../ui/VisuallyHidden';

type SceneLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function SceneLayout({children, title}: SceneLayoutProps) {
  return (
    <>
      <VisuallyHidden>
        <header>
          <h1>{`"${title}" scene`}</h1>
        </header>
      </VisuallyHidden>

      <noscript>
        <div className='fixed z-10 flex h-full w-full items-center justify-center'>
          <p className='text-gray-12'>
            {
              'Cannot display the scene because JavaScript is disabled in this browser :('
            }
          </p>
        </div>
      </noscript>

      <main className='h-full w-full'>{children}</main>

      <footer className='fixed bottom-6 left-4 right-4 z-20 flex items-end sm:bottom-8 sm:left-8 sm:right-8'>
        <div /* This empty div is required for the link to be aligned the same way it appears on homepage */
        >
          <Link size='xs' href='/' aria-label='Go back'>
            {`<- Back`}
          </Link>
        </div>
      </footer>
    </>
  );
}
