import {forwardRef} from 'react';
import {cn} from '../../utils/cn';
import {
  HeadlessLink,
  type HeadlessLinkRef,
  type HeadlessLinkProps,
} from '../headless/HeadlessLink';

export type LinkRef = HeadlessLinkRef;
export type LinkProps = Omit<HeadlessLinkProps, 'className'> & {
  size?: 'xs' | 'base';
};

export const Link = forwardRef<LinkRef, LinkProps>(
  ({size = 'base', ...rest}, forwardedRef) => {
    return (
      <HeadlessLink
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
