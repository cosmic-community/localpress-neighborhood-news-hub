// lib/cosmic.ts
import { createBucketClient } from '@cosmicjs/sdk'
import { NewsArticle, ZipCodeArea, NewsSource, Tip, CosmicResponse, isCosmicError } from '@/types'
import { fetchNewsForZipCode, fetchGeneralNews } from './newsdata'

// Initialize Cosmic client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all news articles with related data
export async function getAllNewsArticles(): Promise<NewsArticle[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'news-articles'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(100);
    
    return response.objects as NewsArticle[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching news articles:', error);
    throw new Error('Failed to fetch news articles');
  }
}

// Fetch news articles by zip code (combines Cosmic CMS + external sources)
export async function getNewsArticlesByZipCode(zipCode: string): Promise<NewsArticle[]> {
  try {
    // First, find the zip code area
    const zipCodeArea = await findZipCodeArea(zipCode);
    if (!zipCodeArea) {
      return [];
    }

    // Fetch from Cosmic CMS
    let cosmicArticles: NewsArticle[] = [];
    try {
      const response = await cosmic.objects
        .find({
          type: 'news-articles',
          'metadata.zip_code_areas': zipCodeArea.id
        })
        .props(['id', 'title', 'slug', 'metadata'])
        .depth(1)
        .limit(50);
      
      cosmicArticles = response.objects as NewsArticle[];
    } catch (error) {
      if (hasStatus(error) && error.status === 404) {
        cosmicArticles = [];
      } else {
        console.error('Error fetching Cosmic articles:', error);
      }
    }

    // Fetch from external sources (NewsData.io)
    let externalArticles: Partial<NewsArticle>[] = [];
    try {
      externalArticles = await fetchNewsForZipCode(zipCodeArea, 10);
    } catch (error) {
      console.error('Error fetching external articles:', error);
      externalArticles = [];
    }

    // Convert external articles to full NewsArticle format for consistency
    const convertedExternalArticles: NewsArticle[] = externalArticles.map((article, index) => ({
      id: `external-${article.slug}-${index}`,
      slug: article.slug || `external-${index}`,
      title: article.title || 'Untitled',
      content: article.metadata?.content || '',
      type_slug: 'news-articles' as const,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        headline: article.metadata?.headline || article.title || 'Untitled',
        summary: article.metadata?.summary || '',
        content: article.metadata?.content || '',
        source_url: article.metadata?.source_url || '',
        publication_date: article.metadata?.publication_date || new Date().toISOString().split('T')[0],
        zip_code_areas: article.metadata?.zip_code_areas || [zipCodeArea],
        news_source: article.metadata?.news_source,
        featured_image: article.metadata?.featured_image,
        category: article.metadata?.category || { key: 'local', value: 'Local News' }
      }
    }));

    // Combine and sort by publication date (newest first)
    const allArticles = [...cosmicArticles, ...convertedExternalArticles];
    
    return allArticles.sort((a, b) => {
      const dateA = new Date(a.metadata.publication_date || a.created_at);
      const dateB = new Date(b.metadata.publication_date || b.created_at);
      return dateB.getTime() - dateA.getTime();
    });

  } catch (error) {
    console.error('Error fetching news articles by zip code:', error);
    throw new Error('Failed to fetch news articles for zip code');
  }
}

// Enhanced getAllNewsArticles with external sources
export async function getAllNewsArticlesWithExternal(limit: number = 50): Promise<NewsArticle[]> {
  try {
    // Fetch from Cosmic CMS
    let cosmicArticles: NewsArticle[] = [];
    try {
      cosmicArticles = await getAllNewsArticles();
    } catch (error) {
      console.error('Error fetching Cosmic articles:', error);
    }

    // Fetch from external sources if we need more content
    let externalArticles: Partial<NewsArticle>[] = [];
    const remainingSlots = Math.max(0, limit - cosmicArticles.length);
    
    if (remainingSlots > 0) {
      try {
        externalArticles = await fetchGeneralNews({
          limit: remainingSlots,
          timeframe: '3'
        });
      } catch (error) {
        console.error('Error fetching external articles:', error);
      }
    }

    // Convert external articles
    const convertedExternalArticles: NewsArticle[] = externalArticles.map((article, index) => ({
      id: `external-general-${article.slug}-${index}`,
      slug: article.slug || `external-general-${index}`,
      title: article.title || 'Untitled',
      content: article.metadata?.content || '',
      type_slug: 'news-articles' as const,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        headline: article.metadata?.headline || article.title || 'Untitled',
        summary: article.metadata?.summary || '',
        content: article.metadata?.content || '',
        source_url: article.metadata?.source_url || '',
        publication_date: article.metadata?.publication_date || new Date().toISOString().split('T')[0],
        zip_code_areas: article.metadata?.zip_code_areas || [],
        news_source: article.metadata?.news_source,
        featured_image: article.metadata?.featured_image,
        category: article.metadata?.category || { key: 'local', value: 'Local News' }
      }
    }));

    // Combine and sort
    const allArticles = [...cosmicArticles, ...convertedExternalArticles];
    
    return allArticles
      .sort((a, b) => {
        const dateA = new Date(a.metadata.publication_date || a.created_at);
        const dateB = new Date(b.metadata.publication_date || b.created_at);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, limit);

  } catch (error) {
    console.error('Error fetching all news articles:', error);
    throw new Error('Failed to fetch news articles');
  }
}

// Find a specific zip code area
export async function findZipCodeArea(zipCode: string): Promise<ZipCodeArea | null> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'zip-code-areas',
        'metadata.zip_code': zipCode,
        'metadata.active': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .limit(1);
    
    const areas = response.objects as ZipCodeArea[];
    return areas.length > 0 ? areas[0] || null : null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error finding zip code area:', error);
    throw new Error('Failed to find zip code area');
  }
}

// Get all zip code areas
export async function getAllZipCodeAreas(): Promise<ZipCodeArea[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'zip-code-areas',
        'metadata.active': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .limit(100);
    
    return response.objects as ZipCodeArea[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching zip code areas:', error);
    throw new Error('Failed to fetch zip code areas');
  }
}

// Fetch a single news article by slug
export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'news-articles',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as NewsArticle;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching news article:', error);
    throw new Error('Failed to fetch news article');
  }
}

// Create a new tip
export async function createTip(tipData: {
  amount: number;
  tipperName: string;
  message: string;
  email?: string;
  showPublicly: boolean;
}): Promise<Tip> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'tips',
      title: tipData.tipperName ? `Tip from ${tipData.tipperName}` : 'Anonymous Tip',
      metadata: {
        amount: tipData.amount,
        tipper_name: tipData.tipperName || 'Anonymous',
        message: tipData.message || '',
        email: tipData.email || '',
        tip_date: new Date().toISOString().split('T')[0],
        show_publicly: tipData.showPublicly
      }
    });
    
    return response.object as Tip;
  } catch (error) {
    console.error('Error creating tip:', error);
    throw new Error('Failed to create tip');
  }
}

// Get public tips for display
export async function getPublicTips(): Promise<Tip[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'tips',
        'metadata.show_publicly': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .limit(10);
    
    return response.objects as Tip[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching public tips:', error);
    throw new Error('Failed to fetch public tips');
  }
}

// Get all news sources
export async function getAllNewsSources(): Promise<NewsSource[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'news-sources'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .limit(50);
    
    return response.objects as NewsSource[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching news sources:', error);
    throw new Error('Failed to fetch news sources');
  }
}

// Enhanced search with external sources
export async function searchNewsArticles(keyword: string, zipCode?: string): Promise<NewsArticle[]> {
  try {
    let cosmicResults: NewsArticle[] = [];
    
    // Search in Cosmic CMS
    try {
      let query: Record<string, any> = {
        type: 'news-articles',
        $or: [
          { 'metadata.headline': { $regex: keyword, $options: 'i' } },
          { 'metadata.summary': { $regex: keyword, $options: 'i' } },
          { 'metadata.content': { $regex: keyword, $options: 'i' } }
        ]
      };

      // If zip code is provided, filter by it
      if (zipCode) {
        const zipCodeArea = await findZipCodeArea(zipCode);
        if (zipCodeArea) {
          query['metadata.zip_code_areas'] = zipCodeArea.id;
        }
      }

      const response = await cosmic.objects
        .find(query)
        .props(['id', 'title', 'slug', 'metadata'])
        .depth(1)
        .limit(10);
      
      cosmicResults = response.objects as NewsArticle[];
    } catch (error) {
      if (hasStatus(error) && error.status === 404) {
        cosmicResults = [];
      } else {
        console.error('Error searching Cosmic articles:', error);
      }
    }

    // Search external sources
    let externalResults: Partial<NewsArticle>[] = [];
    try {
      const { searchExternalNews } = await import('./newsdata');
      externalResults = await searchExternalNews(keyword, {
        limit: 10,
        timeframe: '7'
      });
    } catch (error) {
      console.error('Error searching external sources:', error);
    }

    // Convert external results
    const convertedExternalResults: NewsArticle[] = externalResults.map((article, index) => ({
      id: `external-search-${article.slug}-${index}`,
      slug: article.slug || `external-search-${index}`,
      title: article.title || 'Untitled',
      content: article.metadata?.content || '',
      type_slug: 'news-articles' as const,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        headline: article.metadata?.headline || article.title || 'Untitled',
        summary: article.metadata?.summary || '',
        content: article.metadata?.content || '',
        source_url: article.metadata?.source_url || '',
        publication_date: article.metadata?.publication_date || new Date().toISOString().split('T')[0],
        zip_code_areas: article.metadata?.zip_code_areas || [],
        news_source: article.metadata?.news_source,
        featured_image: article.metadata?.featured_image,
        category: article.metadata?.category || { key: 'local', value: 'Local News' }
      }
    }));

    // Combine and sort results
    const allResults = [...cosmicResults, ...convertedExternalResults];
    
    return allResults
      .sort((a, b) => {
        const dateA = new Date(a.metadata.publication_date || a.created_at);
        const dateB = new Date(b.metadata.publication_date || b.created_at);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 20);

  } catch (error) {
    console.error('Error searching news articles:', error);
    throw new Error('Failed to search news articles');
  }
}