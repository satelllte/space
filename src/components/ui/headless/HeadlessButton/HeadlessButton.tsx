import {forwardRef} from 'react';

type ButtonRef = React.ElementRef<'button'>;
type ButtonProps = React.ComponentProps<'button'>;

export type HeadlessButtonRef = ButtonRef;
export type HeadlessButtonProps = Omit<
  ButtonProps,
  | 'children' ///
  | 'type' // Omitting, because it's handled here
> & {
  children: React.ReactNode; // Re-declaring just to mark the prop as required
};

export const HeadlessButton = forwardRef<
  HeadlessButtonRef,
  HeadlessButtonProps
>((props, forwardedRef) => {
  return <button ref={forwardedRef} type='button' {...props} />;
});
