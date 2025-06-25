import { CategoryKey, CategoryConfig } from '@/types'

// Category configurations with colors and descriptions
export const categoryConfigs: CategoryConfig[] = [
  {
    key: 'local',
    value: 'Local News',
    color: 'news-local',
    description: 'Community news and local events'
  },
  {
    key: 'politics',
    value: 'Politics',
    color: 'news-politics',
    description: 'Political news and government updates'
  },
  {
    key: 'business',
    value: 'Business',
    color: 'news-business',
    description: 'Business news and economic updates'
  },
  {
    key: 'sports',
    value: 'Sports',
    color: 'news-sports',
    description: 'Sports news and athletic events'
  },
  {
    key: 'weather',
    value: 'Weather',
    color: 'news-weather',
    description: 'Weather updates and forecasts'
  },
  {
    key: 'community',
    value: 'Community',
    color: 'news-community',
    description: 'Community events and social news'
  }
];

// Get category configuration by key
export function getCategoryConfig(key: CategoryKey): CategoryConfig | undefined {
  return categoryConfigs.find(config => config.key === key);
}

// Format date for display
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid date';
  }
}

// Format relative time (e.g., "2 hours ago")
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    return 'Unknown time';
  }
}

// Validate zip code format
export function isValidZipCode(zipCode: string): boolean {
  // US zip code validation (5 digits or 5-4 format)
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode.trim());
}

// Extract zip code from string (remove any non-numeric characters except hyphens)
export function sanitizeZipCode(zipCode: string): string {
  return zipCode.replace(/[^\d-]/g, '').substring(0, 10);
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
}

// Generate optimized image URL with imgix parameters
export function optimizeImageUrl(
  imgixUrl: string,
  options: {
    width?: number;
    height?: number;
    fit?: 'crop' | 'fill' | 'scale' | 'clip';
    quality?: number;
  } = {}
): string {
  if (!imgixUrl) return '';
  
  const params = new URLSearchParams();
  
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.fit) params.set('fit', options.fit);
  if (options.quality) params.set('q', options.quality.toString());
  
  // Always add format optimization
  params.set('auto', 'format,compress');
  
  const separator = imgixUrl.includes('?') ? '&' : '?';
  return `${imgixUrl}${separator}${params.toString()}`;
}

// Calculate reading time estimate
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Combine CSS class names
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Generate meta description from content
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove HTML tags and clean up text
  const plainText = content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  return truncateText(plainText, maxLength);
}

// Format currency for tips display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate random placeholder colors for missing images
export function getPlaceholderColor(seed: string): string {
  const colors = [
    'bg-blue-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-indigo-100',
  ];
  
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}