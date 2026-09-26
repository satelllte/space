import {Link} from '../Link';

type MDXLinkProps = {
  href?: string;
  children: React.ReactNode;
};

export function MDXLink({href = '', children}: MDXLinkProps) {
  const external = /^https?:\/\//.test(href);
  return (
    <Link data-slot='mdx-link' external={external} href={href}>
      {children}
      {external && <span className='sr-only'> (opens in a new tab)</span>}
    </Link>
  );
}
