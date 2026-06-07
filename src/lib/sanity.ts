import { createClient, SanityClient } from '@sanity/client'
import imageUrlBuilder, { SanityImageSource } from '@sanity/image-url'
import { Article } from '@/types'

function isConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return !!(projectId && projectId !== 'your_project_id' && projectId !== 'placeholder')
}

function getSanityClient(): SanityClient | null {
  if (!isConfigured()) {
    return null
  }

  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
    token: process.env.SANITY_API_TOKEN,
  })
}

function getBuilder() {
  const client = getSanityClient()
  if (!client) {
    return null
  }
  return imageUrlBuilder(client)
}

export function urlFor(source: SanityImageSource) {
  const builder = getBuilder()
  if (!builder) {
    return {
      width: function(_w: number) { return this },
      height: function(_h: number) { return this },
      url: function() { return '' },
    } as any
  }
  return builder.image(source)
}

export async function getAllArticles(sport?: string): Promise<Article[]> {
  const client = getSanityClient()
  if (!client) {
    return []
  }

  try {
    const filter = sport ? `&& sport == "${sport}"` : ''
    return await client.fetch(`
      *[_type == "article" ${filter}] | order(publishedAt desc) {
        _id, title, slug, excerpt, sport,
        coverImage, author, publishedAt,
        readTime, views, isFeatured, isTrending
      }
    `)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const client = getSanityClient()
  if (!client) {
    return null
  }

  try {
    return await client.fetch(`
      *[_type == "article" && isFeatured == true][0] {
        _id, title, slug, excerpt, sport,
        coverImage, author, publishedAt, readTime, views
      }
    `)
  } catch (error) {
    console.error('Error fetching featured article:', error)
    return null
  }
}

export async function getTrendingArticles(): Promise<Article[]> {
  const client = getSanityClient()
  if (!client) {
    return []
  }

  try {
    return await client.fetch(`
      *[_type == "article" && isTrending == true][0..4] {
        _id, title, slug, sport, readTime
      }
    `)
  } catch (error) {
    console.error('Error fetching trending articles:', error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const client = getSanityClient()
  if (!client) {
    return null
  }

  try {
    return await client.fetch(`
      *[_type == "article" && slug.current == $slug][0] {
        _id, title, slug, excerpt, sport, coverImage,
        author, publishedAt, readTime, views, body
      }
    `, { slug })
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export async function getRelatedArticles(slug: string, sport: string): Promise<Article[]> {
  const client = getSanityClient()
  if (!client) {
    return []
  }

  try {
    return await client.fetch(`
      *[_type == "article" && slug.current != $slug && sport == $sport][0..2] {
        _id, title, slug, excerpt, sport,
        coverImage, author, publishedAt, readTime
      }
    `, { slug, sport })
  } catch (error) {
    console.error('Error fetching related articles:', error)
    return []
  }
}

export async function getAllArticleSlugs(): Promise<{ slug: { current: string } }[]> {
  const client = getSanityClient()
  if (!client) {
    return []
  }

  try {
    return await client.fetch(`
      *[_type == "article"]{ slug }
    `)
  } catch (error) {
    console.error('Error fetching slugs:', error)
    return []
  }
}