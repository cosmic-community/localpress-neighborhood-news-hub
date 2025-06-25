// app/news/[zipCode]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NewsGrid from '@/components/NewsGrid'
import CategoryFilter from '@/components/CategoryFilter'
import ZipCodeHeader from '@/components/ZipCodeHeader'
import LoadingSpinner from '@/components/LoadingSpinner'
import { getNewsArticlesByZipCode, findZipCodeArea } from '@/lib/cosmic'
import { isValidZipCode } from '@/lib/utils'
import { Suspense } from 'react'

interface NewsPageProps {
  params: Promise<{
    zipCode: string
  }>
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { zipCode } = await params
  
  if (!isValidZipCode(zipCode)) {
    return {
      title: 'Invalid Zip Code - LocalPress',
      description: 'The zip code provided is not valid.',
    }
  }

  const zipCodeArea = await findZipCodeArea(zipCode)
  const locationName = zipCodeArea ? `${zipCodeArea.metadata.city}, ${zipCodeArea.metadata.state}` : zipCode

  return {
    title: `Local News for ${locationName} - LocalPress`,
    description: `Stay informed with local news, community events, and updates for ${locationName}. Your neighborhood news hub.`,
    openGraph: {
      title: `Local News for ${locationName} - LocalPress`,
      description: `Stay informed with local news, community events, and updates for ${locationName}.`,
    },
  }
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { zipCode } = await params

  // Validate zip code format
  if (!isValidZipCode(zipCode)) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Suspense fallback={
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        }>
          <NewsContentWrapper zipCode={zipCode} />
        </Suspense>
      </div>
    </div>
  )
}

async function NewsContentWrapper({ zipCode }: { zipCode: string }) {
  try {
    // Fetch zip code area info and news articles
    const [zipCodeArea, articles] = await Promise.all([
      findZipCodeArea(zipCode),
      getNewsArticlesByZipCode(zipCode)
    ])

    if (!zipCodeArea) {
      return (
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Zip Code Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We don't have coverage for zip code {zipCode} yet. We're constantly expanding our coverage area.
          </p>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You can still browse recent headlines from other areas:
            </p>
            <a 
              href="/" 
              className="inline-block btn-primary"
            >
              Browse Recent News
            </a>
          </div>
        </div>
      )
    }

    return (
      <>
        <ZipCodeHeader zipCodeArea={zipCodeArea} articleCount={articles.length} />
        
        {articles.length > 0 ? (
          <div className="mt-8">
            <CategoryFilter />
            <NewsGrid articles={articles} />
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              No News Available
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              There are no news articles available for {zipCodeArea.metadata.city}, {zipCodeArea.metadata.state} at the moment. 
              Check back later for updates.
            </p>
            <a 
              href="/" 
              className="inline-block btn-primary"
            >
              Explore Other Areas
            </a>
          </div>
        )}
      </>
    )
  } catch (error) {
    console.error('Error loading news content:', error)
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          We encountered an error while loading news for zip code {zipCode}. Please try again later.
        </p>
        <a 
          href="/" 
          className="inline-block btn-primary"
        >
          Go Home
        </a>
      </div>
    )
  }
}