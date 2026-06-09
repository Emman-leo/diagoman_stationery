import { NextResponse } from 'next/server'

export function GET() {
  const body = `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://diagoman-stationery.vercel.app/sitemap.xml`
  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
