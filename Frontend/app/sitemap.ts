import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "http://localhost:3000"

  // ✅ Sitemap index pointing to all sitemaps
  return [
    {
      url: `${siteUrl}/sitemap-pages.xml`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/sitemap-cars.xml`,
      lastModified: new Date(),
    },
    // Optional: If you split large car sitemaps
    // {
    //   url: `${siteUrl}/sitemap-cars-2.xml`,
    //   lastModified: new Date(),
    // },
  ]
}