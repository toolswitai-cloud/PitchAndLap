import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toLowerCase() || ''

    if (!query) {
      return NextResponse.json([])
    }

    // Try Meilisearch first
    try {
      const meilisearchHost = process.env.MEILISEARCH_HOST
      const meilisearchKey = process.env.MEILISEARCH_API_KEY

      if (meilisearchHost && meilisearchKey) {
        const response = await fetch(
          `${meilisearchHost}/indexes/articles/search`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${meilisearchKey}`,
            },
            body: JSON.stringify({
              q: query,
              limit: 10,
              attributesToHighlight: ['title', 'excerpt'],
            }),
          }
        )

        if (response.ok) {
          const data = await response.json()
          const results = data.hits?.map((hit: any) => ({
            title: hit._formatted?.title || hit.title,
            slug: hit.slug,
            sport: hit.sport,
            excerpt: hit._formatted?.excerpt || hit.excerpt,
            publishedAt: hit.publishedAt,
          })) || []

          return NextResponse.json(results)
        }
      }
    } catch (meiliError) {
      console.error('Meilisearch error, falling back to Sanity:', meiliError)
    }

    // Fallback: search Sanity directly
    const articles = await getAllArticles()
    const filtered = articles
      .filter(
        (article: any) =>
          article.title?.toLowerCase().includes(query) ||
          article.excerpt?.toLowerCase().includes(query)
      )
      .slice(0, 10)
      .map((article: any) => ({
        title: article.title,
        slug: article.slug,
        sport: article.sport,
        excerpt: article.excerpt,
        publishedAt: article.publishedAt,
      }))

    return NextResponse.json(filtered)
  } catch (error: any) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}