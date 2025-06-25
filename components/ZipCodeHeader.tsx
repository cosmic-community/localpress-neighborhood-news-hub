import { MapPin, Users } from 'lucide-react'
import { ZipCodeArea } from '@/types'

interface ZipCodeHeaderProps {
  zipCodeArea: ZipCodeArea
  articleCount: number
}

export default function ZipCodeHeader({ zipCodeArea, articleCount }: ZipCodeHeaderProps) {
  const { city, state, county, zip_code } = zipCodeArea.metadata

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8 mb-8">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-lg">
          <MapPin className="h-8 w-8 text-primary" />
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Local News for {city}, {state}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Zip Code:</span>
              <span className="bg-background px-3 py-1 rounded-full text-sm font-mono">
                {zip_code}
              </span>
            </div>
            
            {county && (
              <div className="flex items-center gap-2">
                <span className="font-medium">County:</span>
                <span>{county}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>
              {articleCount} {articleCount === 1 ? 'article' : 'articles'} available
            </span>
          </div>
        </div>
      </div>

      {/* Coverage Note */}
      <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <strong>About this coverage area:</strong> We aggregate news from local sources 
          relevant to the {city} area and surrounding {county}. News articles are 
          updated regularly throughout the day.
        </p>
      </div>
    </div>
  )
}