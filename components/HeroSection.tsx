'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Search } from 'lucide-react'
import { isValidZipCode, sanitizeZipCode } from '@/lib/utils'
import LoadingSpinner from './LoadingSpinner'

export default function HeroSection() {
  const [zipCode, setZipCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const cleanZipCode = sanitizeZipCode(zipCode)

    if (!cleanZipCode) {
      setError('Please enter a zip code')
      setIsLoading(false)
      return
    }

    if (!isValidZipCode(cleanZipCode)) {
      setError('Please enter a valid zip code (e.g., 90210 or 90210-1234)')
      setIsLoading(false)
      return
    }

    try {
      // Navigate to the news page for this zip code
      router.push(`/news/${cleanZipCode}`)
    } catch (error) {
      console.error('Navigation error:', error)
      setError('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeZipCode(e.target.value)
    setZipCode(value)
    if (error) setError('')
  }

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 text-center">
        {/* Main Headlines */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Neighborhood
            <span className="text-primary block">News Hub</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Enter your zip code to discover local news, community events, and stories 
            that matter to your neighborhood. Stay connected with what's happening around you.
          </p>
        </div>

        {/* Zip Code Input */}
        <div className="max-w-md mx-auto mb-16">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={zipCode}
                onChange={handleZipCodeChange}
                placeholder="Enter your zip code"
                className="w-full pl-12 pr-20 py-4 text-lg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                disabled={isLoading}
                maxLength={10}
              />
              <button
                type="submit"
                disabled={isLoading || !zipCode.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Find News</span>
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm mt-2 text-left">
                {error}
              </p>
            )}
          </form>

          {/* Helper Text */}
          <p className="text-sm text-muted-foreground mt-4">
            Examples: 90210, 10001, 60601
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Hyper-Local Focus
            </h3>
            <p className="text-muted-foreground">
              Get news specifically for your zip code area, not just your city or state.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Organized by Topic
            </h3>
            <p className="text-muted-foreground">
              Find news easily with categories like local, politics, business, and sports.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Mobile Friendly
            </h3>
            <p className="text-muted-foreground">
              Perfect experience on any device, from smartphones to desktops.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}