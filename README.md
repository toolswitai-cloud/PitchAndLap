# PitchAndLap

A production sports blog built with Next.js 14, covering Cricket, Football, Tennis, and F1.

## Features

- **Next.js 14** with App Router and Server Components
- **Sanity CMS** for content management
- **Supabase** for database (subscribers, polls, views)
- **Beehiiv** for newsletter integration
- **Meilisearch** for full-text search
- **Tailwind CSS** for styling
- **RSS Feed** generation
- **SEO optimized** with metadata and JSON-LD

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **CMS**: Sanity.io
- **Database**: Supabase
- **Newsletter**: Beehiiv
- **Search**: Meilisearch
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account
- Supabase account
- Beehiiv account (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pitchandlap.git
cd pitchandlap
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your `.env.local` with the following:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Beehiiv
BEEHIIV_API_KEY=your_beehiiv_key
BEEHIIV_PUBLICATION_ID=your_pub_id

# Meilisearch
MEILISEARCH_HOST=your_meilisearch_url
MEILISEARCH_API_KEY=your_master_key

# App
NEXT_PUBLIC_SITE_URL=https://yourname.me

# Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Supabase Setup

Run the following SQL in your Supabase SQL editor:

```sql
-- Subscribers table
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  sport_interest TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Poll votes table
CREATE TABLE poll_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id TEXT NOT NULL,
  option_id TEXT NOT NULL,
  voter_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(poll_id, voter_hash)
);

-- Article views table
CREATE TABLE article_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT UNIQUE NOT NULL,
  views INTEGER DEFAULT 0,
  last_viewed TIMESTAMPTZ DEFAULT NOW()
);

-- Polls table
CREATE TABLE polls (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  sport TEXT NOT NULL,
  options JSONB NOT NULL,
  total_votes INTEGER DEFAULT 0,
  ends_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Sanity CMS Setup

1. Create a Sanity project:
```bash
npm create sanity@latest
```

2. Add the article schema to your Sanity project:
```javascript
// schemas/article.js
export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt', type: 'text', rows: 3 },
    { name: 'sport', type: 'string',
      options: { list: ['cricket','football','tennis','f1'] }},
    { name: 'coverImage', type: 'image', options: { hotspot: true }},
    { name: 'author', type: 'string' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'readTime', type: 'number' },
    { name: 'isFeatured', type: 'boolean', initialValue: false },
    { name: 'isTrending', type: 'boolean', initialValue: false },
    { name: 'body', type: 'array', of: [{ type: 'block' }] },
  ]
}
```

## Adding a New Sport

To add a new sport category:

1. Update `src/types/index.ts` to add the sport to `SPORT_CONFIG`
2. Update `src/lib/constants.ts` to include the new sport in `SPORTS`
3. Update the sport dropdown in `NewsletterSection.tsx`
4. Add the new sport option to your Sanity article schema

## Deployment

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Railway (Backend - Optional)

If you want a separate backend:

1. Create a Railway project
2. Add a Node.js service
3. Deploy the backend code

## License

MIT License# PitchAndLap
