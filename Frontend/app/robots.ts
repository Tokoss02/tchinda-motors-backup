import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/login',
        '/add-car',
        '/2fa'
      ],
    },
    sitemap: 'http://localhost:3000/sitemap.xml',
  }
}