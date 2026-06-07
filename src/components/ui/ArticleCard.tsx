import Link from 'next/link'
import { Clock, Eye } from 'lucide-react'
import { SPORT_CONFIG } from '@/types'
import type { Article, SportType } from '@/types'

interface ArticleCardProps {
  article: Article
  compact?: boolean
}

export default function ArticleCard({ article, compact = false }: ArticleCardProps) {
  const sportConfig = SPORT_CONFIG[article.sport as SportType]
  const slug = article.slug as string

  if (compact) {
    return (
      <Link
        href={`/${article.sport}/${slug}`}
        className="group block"
      >
        <article className="flex gap-4 p-3 rounded-lg hover:bg-card-hover transition-colors">
          {article.image && (
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-card">
              <img
                src={article.image}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span
              className="inline-block px-2 py-0.5 text-xs font-medium uppercase rounded"
              style={{
                backgroundColor: sportConfig.bgColor,
                color: sportConfig.textColor,
              }}
            >
              {sportConfig.name}
            </span>
            <h4 className="text-white font-medium mt-2 line-clamp-2 group-hover:text-white transition-colors">
              {article.title}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-[#444]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link
      href={`/${article.sport}/${slug}`}
      className="group block"
    >
      <article className="bg-card border border-border hover:border-border-hover rounded-card overflow-hidden transition-all">
        {/* Image */}
        {article.image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Sport Badge */}
            <div className="absolute top-3 left-3">
              <span
                className="inline-block px-2 py-1 text-xs font-semibold uppercase rounded"
                style={{
                  backgroundColor: sportConfig.bgColor,
                  color: sportConfig.textColor,
                }}
              >
                {sportConfig.name}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <p className="text-muted text-sm line-clamp-2 mb-4">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-[#444]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.viewCount || 0}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}