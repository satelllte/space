import {LayoutDefault} from '../../ui/layout/LayoutDefault';
import {Link} from '../../ui/Link';

type ErrorPageProps = {
  message: string;
};

export function ErrorPage({message}: ErrorPageProps) {
  return (
    <LayoutDefault>
      <main className='flex flex-col gap-4'>
        <h1 className='text-lg text-gray-12'>{message}</h1>
        <Link size='xs' href='/' aria-label='Go back'>
          {'<- Back'}
        </Link>
      </main>
    </LayoutDefault>
  );
}
