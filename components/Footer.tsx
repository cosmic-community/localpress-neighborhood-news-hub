import Link from 'next/link'
import { Newspaper, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground mb-4">
              <Newspaper className="h-8 w-8 text-primary" />
              <span>LocalPress</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your neighborhood news hub. Discover local stories, community events, 
              and news that matters to your zip code area.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with love for local communities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a 
                href="mailto:hello@localpress.news"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>hello@localpress.news</span>
              </a>
              <p className="text-sm text-muted-foreground">
                Questions? Feedback? We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} LocalPress. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/contact" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Support
              </Link>
              <a 
                href="https://www.cosmicjs.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Powered by Cosmic
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}