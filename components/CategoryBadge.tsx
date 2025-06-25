import { getCategoryConfig } from '@/lib/utils'
import { CategoryKey } from '@/types'

interface CategoryBadgeProps {
  category: {
    key: CategoryKey
    value: string
  }
  className?: string
}

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const config = getCategoryConfig(category.key)
  
  if (!config) {
    return (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border bg-gray-100 text-gray-800 border-gray-200 ${className}`}>
        {category.value}
      </span>
    )
  }

  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border badge-${category.key} ${className}`}>
      {category.value}
    </span>
  )
}