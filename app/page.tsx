import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import FeaturedNews from '@/components/FeaturedNews'
import NewsletterSignup from '@/components/NewsletterSignup'
import LoadingSpinner from '@/components/LoadingSpinner'
import { getAllNewsArticles } from '@/lib/cosmic'

export const metadata = {
  title: 'LocalPress - Your Neighborhood News Hub',
  description: 'Enter your zip code to discover local news, community events, and stories that matter to your neighborhood.',
}

export default async function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured News Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Recent Headlines
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news from various communities. 
              Enter your zip code above to see personalized local news.
            </p>
          </div>
          
          <Suspense fallback={
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <FeaturedNewsWrapper />
          </Suspense>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  )
}

async function FeaturedNewsWrapper() {
  try {
    const articles = await getAllNewsArticles()
    return <FeaturedNews articles={articles} />
  } catch (error) {
    console.error('Error loading featured news:', error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Unable to load featured news at the moment. Please try again later.
        </p>
      </div>
    )
  }
}