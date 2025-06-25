import Link from 'next/link'
import { NewsArticle } from '@/types'
import NewsCard from './NewsCard'

interface FeaturedNewsProps {
  articles: NewsArticle[]
}

export default function FeaturedNews({ articles }: FeaturedNewsProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          No Featured News Available
        </h3>
        <p className="text-muted-foreground">
          Check back later for the latest news updates.
        </p>
      </div>
    )
  }

  // Get featured article (first one) and recent articles (up to 5 more)
  const featuredArticle = articles[0]
  const recentArticles = articles.slice(1, 6)

  return (
    <div className="space-y-12">
      {/* Featured Article - Large */}
      {featuredArticle && (
        <div className="border-b border-border pb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Featured Story
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Featured Image */}
            {featuredArticle.metadata.featured_image && (
              <div className="order-2 lg:order-1">
                <Link href={`/article/${featuredArticle.slug}`}>
                  <img
                    src={`${featuredArticle.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt={featuredArticle.title}
                    width={600}
                    height={400}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  />
                </Link>
              </div>
            )}

            {/* Featured Content */}
            <div className="order-1 lg:order-2">
              {featuredArticle.metadata.category && (
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border badge-${featuredArticle.metadata.category.key}`}>
                    {featuredArticle.metadata.category.value}
                  </span>
                </div>
              )}
              
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                <Link 
                  href={`/article/${featuredArticle.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {featuredArticle.metadata.headline || featuredArticle.title}
                </Link>
              </h2>

              {featuredArticle.metadata.summary && (
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {featuredArticle.metadata.summary}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                {featuredArticle.metadata.news_source && (
                  <span>{featuredArticle.metadata.news_source.metadata.source_name}</span>
                )}
                {featuredArticle.metadata.publication_date && (
                  <span>
                    {new Date(featuredArticle.metadata.publication_date).toLocaleDateString()}
                  </span>
                )}
              </div>

              <Link 
                href={`/article/${featuredArticle.slug}`}
                className="btn-primary"
              >
                Read Full Story
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Recent Articles Grid */}
      {recentArticles.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Recent Headlines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <NewsCard 
                key={article.id} 
                article={article}
              />
            ))}
          </div>
        </div>
      )}

      {/* View More Link */}
      <div className="text-center pt-8">
        <p className="text-muted-foreground mb-4">
          Want to see news for your specific area?
        </p>
        <Link 
          href="/#zip-search"
          className="btn-outline"
        >
          Enter Your Zip Code
        </Link>
      </div>
    </div>
  )
}