import clsx from 'clsx';
import {HeadlessLink, type HeadlessLinkProps} from '../headless/HeadlessLink';

export type LinkIconProps = Omit<HeadlessLinkProps, 'className'> &
  (
    | {
        'aria-label': string;
      }
    | {
        'aria-labelledby': string;
      }
  );

export function LinkIcon(props: LinkIconProps) {
  return (
    <HeadlessLink
      className={clsx(
        // Base
        'tw:inline-flex',
        // Icon color (assumming, the icon has "fill='currentColor'" set)
        'tw:text-gray-12 tw:hover:text-gray-11 tw:active:text-gray-10',
        // Focus (icon color)
        'tw:focus-visible:text-gray-10',
        // Focus (outline)
        'tw:outline-hidden tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4 tw:focus-visible:outline-gray-8 tw:focus-visible:outline-solid',
      )}
      {...props}
    />
  );
}
