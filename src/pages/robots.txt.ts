import type {APIRoute} from 'astro';

export const GET: APIRoute = ({site}) => {
  const txt = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('/sitemap.xml', site).href}`,
    '',
  ].join('\n');

  return new Response(txt, {
    headers: {'Content-Type': 'text/plain; charset=utf-8'},
  });
};
