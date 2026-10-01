import clsx from 'clsx';

type SceneErrorProps = {
  message: string;
  fixed?: boolean;
};

export function SceneError({message, fixed = false}: SceneErrorProps) {
  return (
    <div
      className={clsx(
        'z-10 flex h-full w-full items-center justify-center',
        fixed && 'fixed',
      )}
    >
      <p className='text-gray-12'>{message}</p>
    </div>
  );
}
