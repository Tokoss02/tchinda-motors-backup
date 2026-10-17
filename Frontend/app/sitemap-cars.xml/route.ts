// app/sitemap-cars.xml/route.ts
import { getCarsByBrandAndModelSlug } from '@/services/carService'
import { generateCarSlug } from '@/util/slugUtils'

// Example API endpoints to get all brands/models
// You can adjust based on your backend API
async function getAllBrands() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands`)
  if (!res.ok) return []
  return res.json() // should return array of { slug: string, name: string }
}

async function getModelsByBrand(brandSlug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/${brandSlug}/models`)
  if (!res.ok) return []
  return res.json() // should return array of { slug: string, name: string }
}

export async function GET() {
  const siteUrl = 'http://localhost:3000'
  let urls: string[] = []

  const brands = await getAllBrands()

  for (const brand of brands) {
    const models = await getModelsByBrand(brand.slug)

    for (const model of models) {
      const cars = await getCarsByBrandAndModelSlug(brand.slug, model.slug)

      const carUrls = cars.map(car => {
        const carSlug = generateCarSlug(car)
        return `${siteUrl}/cars-details/${brand.slug}/${model.slug}/${carSlug}`
      })

      urls.push(...carUrls)
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(url => `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join('')}
  </urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}