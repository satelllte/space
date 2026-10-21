import {LayoutDefault} from '../../ui/layout/LayoutDefault';
import {Link} from '../../ui/Link';

type ErrorPageProps = {
  message: string;
};

export function ErrorPage({message}: ErrorPageProps) {
  return (
    <LayoutDefault>
      <main className='tw:flex tw:flex-col tw:gap-4'>
        <h1 className='tw:text-gray-12 tw:text-lg'>{message}</h1>
        <Link size='xs' href='/' aria-label='Go back'>
          {'<- Back'}
        </Link>
      </main>
    </LayoutDefault>
  );
}
