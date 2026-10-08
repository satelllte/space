import clsx from 'clsx';
import {
  HeadlessButton,
  type HeadlessButtonProps,
  type HeadlessButtonRef,
} from '../headless/HeadlessButton';
import {forwardRef} from 'react';

export type ButtonToggleRef = HeadlessButtonRef;
export type ButtonToggleProps = Omit<HeadlessButtonProps, 'className'> & {
  pressed: boolean;
  onClick: () => void;
};

export const ButtonToggle = forwardRef<ButtonToggleRef, ButtonToggleProps>(
  ({pressed, onClick, ...rest}, forwardedRef) => {
    return (
      <HeadlessButton
        ref={forwardedRef}
        aria-pressed={pressed}
        onClick={onClick}
        className={clsx(
          'rounded-full border px-3 py-1 text-xs',
          'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-8',
          pressed
            ? 'border-gray-8 bg-gray-4 text-gray-12'
            : 'border-gray-5 text-gray-11 hover:border-gray-7 hover:text-gray-12',
        )}
        {...rest}
      />
    );
  },
);
