// app/article/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ExternalLink, MapPin, Building2 } from 'lucide-react'
import { getNewsArticleBySlug } from '@/lib/cosmic'
import { formatDate, optimizeImageUrl, generateMetaDescription, getCategoryConfig } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const article = await getNewsArticleBySlug(slug)
    
    if (!article) {
      return {
        title: 'Article Not Found - LocalPress',
        description: 'The requested article could not be found.',
      }
    }

    const description = generateMetaDescription(
      article.metadata.summary || article.metadata.content || article.title
    )

    return {
      title: `${article.metadata.headline || article.title} - LocalPress`,
      description,
      openGraph: {
        title: article.metadata.headline || article.title,
        description,
        type: 'article',
        publishedTime: article.metadata.publication_date,
        images: article.metadata.featured_image ? [
          {
            url: optimizeImageUrl(article.metadata.featured_image.imgix_url, { width: 1200, height: 630 }),
            width: 1200,
            height: 630,
            alt: article.title,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.metadata.headline || article.title,
        description,
        images: article.metadata.featured_image ? [
          optimizeImageUrl(article.metadata.featured_image.imgix_url, { width: 1200, height: 630 })
        ] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata for article:', error)
    return {
      title: 'Article - LocalPress',
      description: 'Local news article on LocalPress.',
    }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params

  try {
    const article = await getNewsArticleBySlug(slug)

    if (!article) {
      notFound()
    }

    const categoryConfig = article.metadata.category ? 
      getCategoryConfig(article.metadata.category.key) : null

    return (
      <article className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Article Header */}
          <header className="mb-8">
            {/* Category Badge */}
            {article.metadata.category && (
              <div className="mb-4">
                <CategoryBadge category={article.metadata.category} />
              </div>
            )}

            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {article.metadata.headline || article.title}
            </h1>

            {/* Summary */}
            {article.metadata.summary && (
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {article.metadata.summary}
              </p>
            )}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
              {/* Publication Date */}
              {article.metadata.publication_date && (
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(article.metadata.publication_date)}</span>
                </div>
              )}

              {/* News Source */}
              {article.metadata.news_source && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{article.metadata.news_source.metadata.source_name}</span>
                </div>
              )}

              {/* Source URL */}
              {article.metadata.source_url && (
                <a 
                  href={article.metadata.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Read Original</span>
                </a>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {article.metadata.featured_image && (
            <div className="mb-8">
              <img
                src={optimizeImageUrl(article.metadata.featured_image.imgix_url, { 
                  width: 1200, 
                  height: 600,
                  fit: 'crop'
                })}
                alt={article.title}
                width={1200}
                height={600}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          {article.metadata.content && (
            <div className="prose prose-lg prose-gray max-w-none mb-12">
              <div 
                dangerouslySetInnerHTML={{ __html: article.metadata.content }}
                className="prose-news"
              />
            </div>
          )}

          {/* Article Footer */}
          <footer className="border-t border-border pt-8">
            {/* News Source Details */}
            {article.metadata.news_source && (
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                  {article.metadata.news_source.metadata.logo && (
                    <img
                      src={optimizeImageUrl(article.metadata.news_source.metadata.logo.imgix_url, {
                        width: 80,
                        height: 80,
                        fit: 'crop'
                      })}
                      alt={article.metadata.news_source.metadata.source_name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      About {article.metadata.news_source.metadata.source_name}
                    </h3>
                    {article.metadata.news_source.metadata.description && (
                      <p className="text-muted-foreground mb-3">
                        {article.metadata.news_source.metadata.description}
                      </p>
                    )}
                    {article.metadata.news_source.metadata.website_url && (
                      <a
                        href={article.metadata.news_source.metadata.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Back to News */}
            <div className="text-center">
              <Link 
                href="/"
                className="btn-outline"
              >
                ← Back to News
              </Link>
            </div>
          </footer>
        </div>
      </article>
    )

  } catch (error) {
    console.error('Error loading article:', error)
    notFound()
  }
}