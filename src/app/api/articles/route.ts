import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/sanity'
import { incrementArticleViews } from '@/lib/supabase'

export const revalidate = 60

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sport = searchParams.get('sport') || undefined

    const articles = await getAllArticles(sport)

    // Increment view count for homepage/sport page views
    // Use a sample approach - don't track every API call
    const sampleSlug = articles[0]?.slug
    if (sampleSlug && Math.random() < 0.1) {
      try {
        await incrementArticleViews(sampleSlug as string)
      } catch {
        // Ignore view increment errors
      }
    }

    return NextResponse.json({ articles })
  } catch (error: any) {
    console.error('Articles API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}