'use client'

import { useState, useMemo } from 'react'
import { NewsArticle, CategoryKey } from '@/types'
import { categoryConfigs } from '@/lib/utils'
import NewsCard from './NewsCard'
import CategoryFilter from './CategoryFilter'

interface NewsGridProps {
  articles: NewsArticle[]
}

export default function NewsGrid({ articles }: NewsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>('all')

  // Filter articles by selected category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') {
      return articles
    }
    
    return articles.filter(article => 
      article.metadata.category?.key === selectedCategory
    )
  }, [articles, selectedCategory])

  const handleCategoryChange = (category: CategoryKey | 'all') => {
    setSelectedCategory(category)
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          No News Articles Available
        </h3>
        <p className="text-muted-foreground">
          There are no news articles available for this area at the moment. 
          Check back later for updates.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Category Filter */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredArticles.length === articles.length 
            ? `Showing all ${articles.length} article${articles.length !== 1 ? 's' : ''}`
            : `Showing ${filteredArticles.length} of ${articles.length} article${articles.length !== 1 ? 's' : ''} in ${
                selectedCategory === 'all' ? 'all categories' : 
                categoryConfigs.find((c: { key: CategoryKey; value: string }) => c.key === selectedCategory)?.value || selectedCategory
              }`
          }
        </p>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <NewsCard 
              key={article.id} 
              article={article}
              priority={index < 3} // Prioritize loading for first 3 articles
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            No Articles in This Category
          </h3>
          <p className="text-muted-foreground mb-6">
            There are no articles in the selected category for this area.
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="btn-primary"
          >
            Show All Articles
          </button>
        </div>
      )}
    </div>
  )
}