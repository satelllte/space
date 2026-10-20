import clsx from 'clsx';
import {HeadlessLink, type HeadlessLinkProps} from '../headless/HeadlessLink';

export type LinkProps = Omit<HeadlessLinkProps, 'className'> & {
  size?: 'xs' | 'base';
};

export function Link({size = 'base', ...rest}: LinkProps) {
  return (
    <HeadlessLink
      className={clsx(
        // Text size
        size === 'xs' && 'tw:text-xs',
        size === 'base' && 'tw:text-base',
        // Text color
        'tw:text-gray-11 tw:active:text-gray-10',
        // Underline
        'tw:underline tw:underline-offset-4',
        // Underline decoration
        'tw:decoration-gray-6 tw:decoration-1 tw:hover:decoration-gray-8 tw:active:decoration-gray-7',
        // Focus (underline)
        'tw:focus-visible:decoration-gray-8',
        // Focus (outline)
        'tw:outline-hidden tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4 tw:focus-visible:outline-gray-8 tw:focus-visible:outline-solid',
      )}
      {...rest}
    />
  );
}
