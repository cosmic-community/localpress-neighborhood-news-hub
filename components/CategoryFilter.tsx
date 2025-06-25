'use client'

import { useState } from 'react'
import { CategoryKey } from '@/types'
import { categoryConfigs } from '@/lib/utils'

interface CategoryFilterProps {
  selectedCategory?: CategoryKey | 'all'
  onCategoryChange?: (category: CategoryKey | 'all') => void
}

export default function CategoryFilter({ 
  selectedCategory = 'all', 
  onCategoryChange 
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>(selectedCategory)

  const handleCategoryClick = (category: CategoryKey | 'all') => {
    setActiveCategory(category)
    onCategoryChange?.(category)
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Filter by Category
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {/* All Categories Button */}
        <button
          onClick={() => handleCategoryClick('all')}
          className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
            activeCategory === 'all'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-foreground border-border hover:bg-muted'
          }`}
        >
          All News
        </button>

        {/* Individual Category Buttons */}
        {categoryConfigs.map((config) => (
          <button
            key={config.key}
            onClick={() => handleCategoryClick(config.key)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
              activeCategory === config.key
                ? `badge-${config.key} font-semibold`
                : 'bg-background text-foreground border-border hover:bg-muted'
            }`}
            title={config.description}
          >
            {config.value}
          </button>
        ))}
      </div>

      {/* Category Description */}
      {activeCategory !== 'all' && (
        <div className="mt-3">
          <p className="text-sm text-muted-foreground">
            {categoryConfigs.find(c => c.key === activeCategory)?.description}
          </p>
        </div>
      )}
    </div>
  )
}