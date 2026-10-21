import clsx from 'clsx';
import {
  HeadlessButton,
  type HeadlessButtonProps,
} from '../headless/HeadlessButton';

export type ButtonToggleProps = Omit<HeadlessButtonProps, 'className'> & {
  pressed: boolean;
  onClick: () => void;
};

export function ButtonToggle({pressed, onClick, ...rest}: ButtonToggleProps) {
  return (
    <HeadlessButton
      aria-pressed={pressed}
      onClick={onClick}
      className={clsx(
        'tw:rounded-full tw:border tw:px-3 tw:py-1 tw:text-xs',
        'tw:outline-hidden tw:focus-visible:outline-2 tw:focus-visible:outline-gray-8 tw:focus-visible:outline-solid tw:focus-visible:outline-offset-2',
        pressed
          ? 'tw:border-gray-8 tw:bg-gray-4 tw:text-gray-12'
          : 'tw:border-gray-5 tw:text-gray-11 tw:hover:border-gray-7 tw:hover:text-gray-12',
      )}
      {...rest}
    />
  );
}
