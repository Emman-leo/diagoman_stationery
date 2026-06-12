import { NextResponse } from 'next/server'

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    '',
    'Sitemap: https://diagoman.org/sitemap.xml',
  ].join('\n')

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
