import {forwardRef} from 'react';
import clsx from 'clsx';
import {
  HeadlessLink,
  type HeadlessLinkRef,
  type HeadlessLinkProps,
} from '../headless/HeadlessLink';

export type LinkIconRef = HeadlessLinkRef;
export type LinkIconProps = Omit<HeadlessLinkProps, 'className'> &
  (
    | {
        'aria-label': string;
      }
    | {
        'aria-labelledby': string;
      }
  );

export const LinkIcon = forwardRef<LinkIconRef, LinkIconProps>(
  (props, forwardedRef) => {
    return (
      <HeadlessLink
        ref={forwardedRef}
        className={clsx(
          // Base
          'inline-flex',
          // Icon color (assumming, the icon has "fill='currentColor'" set)
          'text-gray-12 hover:text-gray-11 active:text-gray-10',
          // Focus (icon color)
          'focus-visible:text-gray-10',
          // Focus (outline)
          'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-8',
        )}
        {...props}
      />
    );
  },
);
