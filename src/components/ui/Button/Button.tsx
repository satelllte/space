import {forwardRef} from 'react';
import {cn} from '../../utils/cn';
import {
  HeadlessButton,
  type HeadlessButtonRef,
  type HeadlessButtonProps,
} from '../headless/HeadlessButton';

export type ButtonRef = HeadlessButtonRef;
export type ButtonProps = Omit<HeadlessButtonProps, 'className'> & {
  size?: 'xs' | 'base';
};

export const Button = forwardRef<ButtonRef, ButtonProps>(
  ({size = 'base', ...rest}, forwardedRef) => {
    return (
      <HeadlessButton
        ref={forwardedRef}
        className={cn(
          // Text size
          size === 'xs' && 'text-xs',
          size === 'base' && 'text-base',
          // Text color
          'text-gray-11 active:text-gray-10',
          // Underline
          'underline underline-offset-4',
          // Underline decoration
          'decoration-gray-6 [text-decoration-thickness:1px] hover:decoration-gray-8 active:decoration-gray-7',
          // Focus (underline)
          'focus-visible:decoration-gray-8',
          // Focus (outline)
          'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-8',
        )}
        {...rest}
      />
    );
  },
);
