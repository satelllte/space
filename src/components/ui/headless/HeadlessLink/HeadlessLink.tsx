type LinkProps = React.ComponentProps<'a'>;

export type HeadlessLinkProps = Omit<
  LinkProps,
  | 'children'
  | 'href'
  | 'rel' // Omitting, because it's handled here
  | 'target' // Omitting, because it's handled here
> & {
  children: React.ReactNode; // Re-declaring just to mark the prop as required
  external?: boolean | undefined;
  href: string; // Re-declaring just to mark the prop as required
};

export function HeadlessLink({external, ...rest}: HeadlessLinkProps) {
  return (
    <a
      rel={external ? 'noreferrer noopener' : undefined}
      target={external ? '_blank' : '_self'}
      {...rest}
    />
  );
}
