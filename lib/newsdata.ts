// lib/newsdata.ts
import { NewsArticle, ZipCodeArea, NewsSource, CategoryKey } from '@/types'

// NewsData.io API response interfaces
interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  keywords?: string[];
  creator?: string[];
  video_url?: string;
  description?: string;
  content?: string;
  pubDate: string;
  image_url?: string;
  source_id: string;
  source_priority: number;
  source_name: string;
  source_url: string;
  source_icon?: string;
  language: string;
  country: string[];
  category: string[];
  ai_tag?: string;
  sentiment?: string;
  sentiment_stats?: string;
  ai_region?: string;
  ai_org?: string;
  duplicate?: boolean;
}

interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
  nextPage?: string;
}

// NewsData.io API client
class NewsDataAPI {
  private apiKey: string;
  private baseUrl = 'https://newsdata.io/api/1/news';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Fetch latest news with optional filters
  async fetchNews(params: {
    q?: string; // Search query
    qInTitle?: string; // Search in title only
    country?: string[]; // Country codes (US, CA, etc.)
    category?: string[]; // Categories (politics, business, sports, etc.)
    language?: string[]; // Language codes (en, es, etc.)
    domain?: string[]; // Specific domains
    excludeDomain?: string[]; // Exclude domains
    timeframe?: string; // Time range (1, 7, 30 days)
    size?: number; // Number of articles (max 50 for free plan)
    page?: string; // Pagination token
  } = {}): Promise<NewsDataResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
      language: 'en', // Default to English
      ...Object.fromEntries(
        Object.entries(params).map(([key, value]) => [
          key,
          Array.isArray(value) ? value.join(',') : String(value)
        ])
      )
    });

    try {
      const response = await fetch(`${this.baseUrl}?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`NewsData API error: ${response.status} ${response.statusText}`);
      }

      const data: NewsDataResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching from NewsData.io:', error);
      throw new Error('Failed to fetch news from NewsData.io');
    }
  }

  // Fetch local news for specific locations
  async fetchLocalNews(params: {
    q?: string;
    country?: string[];
    timeframe?: string;
    size?: number;
  } = {}): Promise<NewsDataResponse> {
    return this.fetchNews({
      category: ['politics', 'domestic', 'other'], // Focus on local/domestic news
      country: params.country || ['us'], // Default to US
      q: params.q,
      timeframe: params.timeframe || '7', // Last 7 days
      size: params.size || 20,
    });
  }

  // Search news by keywords and location
  async searchNewsByLocation(location: string, params: {
    timeframe?: string;
    size?: number;
    category?: string[];
  } = {}): Promise<NewsDataResponse> {
    return this.fetchNews({
      q: location,
      category: params.category || ['politics', 'domestic', 'other'],
      country: ['us'],
      timeframe: params.timeframe || '7',
      size: params.size || 10,
    });
  }
}

// Initialize NewsData.io client - with proper null check
const apiKey = process.env.NEWSDATA_API_KEY;
if (!apiKey) {
  throw new Error('NEWSDATA_API_KEY environment variable is required');
}
const newsDataClient = new NewsDataAPI(apiKey);

// Convert NewsData article to our NewsArticle format
function convertNewsDataToCosmicFormat(
  article: NewsDataArticle,
  zipCodeAreas: ZipCodeArea[] = [],
  newsSource?: NewsSource
): Partial<NewsArticle> {
  // Map NewsData categories to our category system with proper CategoryKey typing
  const categoryMapping: Record<string, { key: CategoryKey; value: string }> = {
    'politics': { key: 'politics' as CategoryKey, value: 'Politics' },
    'business': { key: 'business' as CategoryKey, value: 'Business' },
    'sports': { key: 'sports' as CategoryKey, value: 'Sports' },
    'domestic': { key: 'local' as CategoryKey, value: 'Local News' },
    'other': { key: 'community' as CategoryKey, value: 'Community' },
    'environment': { key: 'community' as CategoryKey, value: 'Community' },
    'health': { key: 'community' as CategoryKey, value: 'Community' },
    'science': { key: 'community' as CategoryKey, value: 'Community' },
    'technology': { key: 'business' as CategoryKey, value: 'Business' },
  };

  // Determine category from NewsData categories - with proper null checks
  const firstCategory = article.category && article.category.length > 0 ? article.category[0] : null;
  const category = firstCategory && categoryMapping[firstCategory] 
    ? categoryMapping[firstCategory] 
    : { key: 'local' as CategoryKey, value: 'Local News' };

  return {
    title: article.title,
    slug: article.article_id,
    metadata: {
      headline: article.title,
      summary: article.description || '',
      content: article.content || article.description || '',
      source_url: article.link,
      publication_date: article.pubDate ? new Date(article.pubDate).toISOString().split('T')[0] : undefined,
      zip_code_areas: zipCodeAreas,
      news_source: newsSource,
      featured_image: article.image_url ? {
        url: article.image_url,
        imgix_url: article.image_url
      } : undefined,
      category: category
    }
  };
}

// Fetch and convert news for a specific zip code area
export async function fetchNewsForZipCode(
  zipCodeArea: ZipCodeArea,
  limit: number = 10
): Promise<Partial<NewsArticle>[]> {
  try {
    const searchTerms = [
      zipCodeArea.metadata?.city,
      zipCodeArea.metadata?.county,
      zipCodeArea.metadata?.city && zipCodeArea.metadata?.state 
        ? `${zipCodeArea.metadata.city} ${zipCodeArea.metadata.state}`
        : null,
    ].filter((term): term is string => Boolean(term));

    const results: Partial<NewsArticle>[] = [];

    // Search for each term and combine results
    for (const term of searchTerms.slice(0, 2)) { // Limit to avoid API quota issues
      try {
        const response = await newsDataClient.searchNewsByLocation(term, {
          size: Math.ceil(limit / searchTerms.length),
          timeframe: '7'
        });

        const convertedArticles = response.results.map(article =>
          convertNewsDataToCosmicFormat(article, [zipCodeArea])
        );

        results.push(...convertedArticles);
      } catch (error) {
        console.error(`Error fetching news for ${term}:`, error);
        // Continue with other search terms
      }
    }

    // Remove duplicates based on title and source URL
    const uniqueResults = results.filter((article, index, arr) =>
      index === arr.findIndex(a =>
        a.metadata?.headline === article.metadata?.headline ||
        a.metadata?.source_url === article.metadata?.source_url
      )
    );

    return uniqueResults.slice(0, limit);
  } catch (error) {
    console.error('Error fetching news for zip code:', error);
    return [];
  }
}

// Fetch general news with optional search
export async function fetchGeneralNews(params: {
  search?: string;
  category?: string[];
  limit?: number;
  timeframe?: string;
} = {}): Promise<Partial<NewsArticle>[]> {
  try {
    const response = await newsDataClient.fetchNews({
      q: params.search,
      category: params.category || ['politics', 'business', 'domestic'],
      country: ['us'],
      timeframe: params.timeframe || '3',
      size: Math.min(params.limit || 20, 50) // NewsData.io free plan limit
    });

    return response.results.map(article =>
      convertNewsDataToCosmicFormat(article)
    );
  } catch (error) {
    console.error('Error fetching general news:', error);
    return [];
  }
}

// Search news across all sources
export async function searchExternalNews(
  query: string,
  params: {
    category?: string[];
    limit?: number;
    timeframe?: string;
  } = {}
): Promise<Partial<NewsArticle>[]> {
  try {
    const response = await newsDataClient.fetchNews({
      q: query,
      category: params.category,
      country: ['us'],
      timeframe: params.timeframe || '7',
      size: Math.min(params.limit || 15, 50)
    });

    return response.results.map(article =>
      convertNewsDataToCosmicFormat(article)
    );
  } catch (error) {
    console.error('Error searching external news:', error);
    return [];
  }
}

// Get trending/breaking news
export async function fetchBreakingNews(limit: number = 10): Promise<Partial<NewsArticle>[]> {
  try {
    const response = await newsDataClient.fetchNews({
      country: ['us'],
      timeframe: '1', // Last 24 hours
      size: Math.min(limit, 50),
      category: ['politics', 'business', 'domestic']
    });

    return response.results.map(article =>
      convertNewsDataToCosmicFormat(article)
    );
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    return [];
  }
}

export { newsDataClient, convertNewsDataToCosmicFormat };
export type { NewsDataArticle, NewsDataResponse };