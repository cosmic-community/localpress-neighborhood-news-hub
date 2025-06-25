import Link from 'next/link'
import { Home, Search, MapPin } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-muted-foreground/50 mb-4">
            404
          </div>
          <div className="bg-muted/20 p-8 rounded-lg">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Page Not Found
            </h1>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved or doesn't exist.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>

          <Link 
            href="/#zip-search"
            className="btn-outline w-full flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            <span>Search for News</span>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">
            Looking for local news?
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter your zip code on our homepage to find news and events 
            specific to your neighborhood.
          </p>
        </div>
      </div>
    </div>
  )
}