import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/sanity'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export async function GET() {
  try {
    const articles = await getAllArticles()
    const recentArticles = articles.slice(0, 20)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${siteUrl}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/api/feed.xml" rel="self" type="application/rss+xml"/>
    <generator>PitchAndLap RSS Generator</generator>
    ${recentArticles.map((article: any) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/${article.sport}/${article.slug}</link>
      <description><![CDATA[${article.excerpt || ''}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/${article.sport}/${article.slug}</guid>
      <category>${article.sport}</category>
      <author>${article.author || 'PitchAndLap'}</author>
    </item>
    `).join('')}
  </channel>
</rss>`

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    })
  } catch (error: any) {
    console.error('RSS feed error:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}