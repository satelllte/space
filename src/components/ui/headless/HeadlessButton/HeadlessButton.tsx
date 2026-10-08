type ButtonProps = React.ComponentProps<'button'>;

export type HeadlessButtonProps = Omit<
  ButtonProps,
  | 'children' ///
  | 'type' // Omitting, because it's handled here
> & {
  children: React.ReactNode; // Re-declaring just to mark the prop as required
};

export function HeadlessButton(props: HeadlessButtonProps) {
  return <button type='button' {...props} />;
}
