import clsx from 'clsx';

type SceneErrorProps = {
  message: string;
  fixed?: boolean;
};

export function SceneError({message, fixed = false}: SceneErrorProps) {
  return (
    <div
      className={clsx(
        'tw:z-10 tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center',
        fixed && 'tw:fixed',
      )}
    >
      <p className='tw:text-gray-12'>{message}</p>
    </div>
  );
}
