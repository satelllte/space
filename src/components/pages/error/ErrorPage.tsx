import {Link} from '../../ui/Link';

type ErrorPageProps = {
  message: string;
};

export function ErrorPage({message}: ErrorPageProps) {
  return (
    <main className='flex min-h-full flex-col gap-4 px-4 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-12'>
      <h1 className='text-lg text-gray-12'>{message}</h1>
      <Link size='xs' href='/' aria-label='Go back'>
        {'<- Back'}
      </Link>
    </main>
  );
}
