import {forwardRef} from 'react';

type DivRef = React.ElementRef<'div'>;
type DivProps = React.ComponentProps<'div'>;

export type VisuallyHiddenRef = DivRef;
export type VisuallyHiddenProps = Omit<
  DivProps,
  | 'children' ///
  | 'className' ///
> & {
  children: React.ReactNode;
};

/**
 * Hides content from the screen in an accessible way.
 * Based on: https://www.radix-ui.com/primitives/docs/utilities/visually-hidden.
 */
export const VisuallyHidden = forwardRef<
  VisuallyHiddenRef,
  VisuallyHiddenProps
>((props, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className='absolute m-[-1px] h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)] [word-wrap:normal]'
      {...props}
    />
  );
});
