import Link from 'next/link'
import { CalendarDays, Building2 } from 'lucide-react'
import { NewsArticle } from '@/types'
import { formatRelativeTime, optimizeImageUrl, truncateText } from '@/lib/utils'
import CategoryBadge from './CategoryBadge'

interface NewsCardProps {
  article: NewsArticle
  priority?: boolean
}

export default function NewsCard({ article, priority = false }: NewsCardProps) {
  const imageUrl = article.metadata.featured_image?.imgix_url
  const optimizedImageUrl = imageUrl ? 
    optimizeImageUrl(imageUrl, { width: 400, height: 250, fit: 'crop' }) : null

  return (
    <article className="card p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Featured Image */}
      {optimizedImageUrl && (
        <div className="relative overflow-hidden">
          <Link href={`/article/${article.slug}`}>
            <img
              src={optimizedImageUrl}
              alt={article.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              loading={priority ? 'eager' : 'lazy'}
            />
          </Link>
          
          {/* Category Badge Overlay */}
          {article.metadata.category && (
            <div className="absolute top-3 left-3">
              <CategoryBadge category={article.metadata.category} />
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category Badge (if no image) */}
        {!optimizedImageUrl && article.metadata.category && (
          <div className="mb-3">
            <CategoryBadge category={article.metadata.category} />
          </div>
        )}

        {/* Headline */}
        <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">
          <Link 
            href={`/article/${article.slug}`}
            className="hover:text-primary transition-colors"
          >
            {truncateText(article.metadata.headline || article.title, 100)}
          </Link>
        </h3>

        {/* Summary */}
        {article.metadata.summary && (
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {truncateText(article.metadata.summary, 120)}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {/* News Source */}
            {article.metadata.news_source && (
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                <span className="truncate max-w-24">
                  {article.metadata.news_source.metadata.source_name}
                </span>
              </div>
            )}

            {/* Publication Date */}
            {article.metadata.publication_date && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                <span>
                  {formatRelativeTime(article.metadata.publication_date)}
                </span>
              </div>
            )}
          </div>

          {/* Read More Link */}
          <Link 
            href={`/article/${article.slug}`}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  )
}