import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/sanity'
import { SITE_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()

  const articleUrls = articles.map((article: any) => ({
    url: `${SITE_URL}/${article.sport}/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const staticPages = [
    { url: SITE_URL, priority: 1.0 },
    { url: `${SITE_URL}/cricket`, priority: 0.8 },
    { url: `${SITE_URL}/football`, priority: 0.8 },
    { url: `${SITE_URL}/tennis`, priority: 0.8 },
    { url: `${SITE_URL}/f1`, priority: 0.8 },
    { url: `${SITE_URL}/about`, priority: 0.6 },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...articleUrls]
}