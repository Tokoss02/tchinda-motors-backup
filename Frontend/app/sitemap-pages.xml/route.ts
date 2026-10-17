// app/sitemap-pages.xml/route.ts
import { MetadataRoute } from 'next'

export async function GET() {
  const siteUrl = "http://localhost:3000"

  // Static pages of your site
  const pages = [
    `${siteUrl}`,
    `${siteUrl}/inventory`,
    `${siteUrl}/contact`,
    `${siteUrl}/term`
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(url => `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('')}
  </urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}