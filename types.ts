// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug?: string;
  created_at: string;
  modified_at: string;
}

// News Articles type with comprehensive metadata structure
export interface NewsArticle extends CosmicObject {
  type_slug: 'news-articles';
  metadata: {
    headline: string;
    summary?: string;
    content?: string;
    source_url?: string;
    publication_date?: string;
    zip_code_areas?: ZipCodeArea[];
    news_source?: NewsSource;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    category?: {
      key: CategoryKey;
      value: string;
    };
  };
}

// Zip Code Areas type
export interface ZipCodeArea extends CosmicObject {
  type_slug: 'zip-code-areas';
  metadata: {
    zip_code: string;
    city: string;
    state: string;
    county?: string;
    active: boolean;
  };
}

// News Sources type
export interface NewsSource extends CosmicObject {
  type_slug: 'news-sources';
  metadata: {
    source_name: string;
    website_url?: string;
    description?: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    type?: {
      key: string;
      value: string;
    };
  };
}

// Tips type
export interface Tip extends CosmicObject {
  type_slug: 'tips';
  metadata: {
    amount: number;
    tipper_name?: string;
    message?: string;
    email?: string;
    tip_date?: string;
    show_publicly: boolean;
  };
}

// Type literals for news categories
export type CategoryKey = 'local' | 'politics' | 'business' | 'sports' | 'weather' | 'community';

// Category configuration with colors and display names
export interface CategoryConfig {
  key: CategoryKey;
  value: string;
  color: string;
  description: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Form data types
export interface ZipCodeFormData {
  zipCode: string;
}

export interface TipFormData {
  amount: number;
  tipperName: string;
  message: string;
  email?: string;
  showPublicly: boolean;
}

export interface NewsletterFormData {
  email: string;
  zipCode: string;
}

// Component prop types
export interface NewsCardProps {
  article: NewsArticle;
  priority?: boolean;
}

export interface CategoryFilterProps {
  categories: CategoryConfig[];
  selectedCategory: CategoryKey | 'all';
  onCategoryChange: (category: CategoryKey | 'all') => void;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Type guards for runtime validation
export function isNewsArticle(obj: CosmicObject): obj is NewsArticle {
  return obj.type_slug === 'news-articles';
}

export function isZipCodeArea(obj: CosmicObject): obj is ZipCodeArea {
  return obj.type_slug === 'zip-code-areas';
}

export function isNewsSource(obj: CosmicObject): obj is NewsSource {
  return obj.type_slug === 'news-sources';
}

export function isTip(obj: CosmicObject): obj is Tip {
  return obj.type_slug === 'tips';
}

// Utility types
export type OptionalMetadata<T extends CosmicObject> = T & {
  metadata: Partial<T['metadata']>;
};
export type CreateTipData = Omit<Tip, 'id' | 'created_at' | 'modified_at'>;

// Error handling types
export interface CosmicError extends Error {
  status?: number;
  code?: string;
}

export function isCosmicError(error: unknown): error is CosmicError {
  return error instanceof Error && 'status' in error;
}