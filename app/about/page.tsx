import { Metadata } from 'next'
import { Users, MapPin, Heart, Newspaper } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About LocalPress - Your Neighborhood News Hub',
  description: 'Learn about LocalPress, the platform connecting communities through hyper-local news and stories that matter to your neighborhood.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About LocalPress
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe every neighborhood has stories worth telling. LocalPress connects you 
            with the news and events that matter most to your community.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="card p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              LocalPress was created to bridge the gap between global news and the stories that 
              directly impact your daily life. By focusing on zip code-level coverage, we ensure 
              you stay informed about what's happening right in your backyard.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Hyper-Local Focus
                  </h3>
                  <p className="text-muted-foreground">
                    Enter your zip code and get news specifically tailored to your neighborhood. 
                    No more sifting through irrelevant stories.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Newspaper className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Curated Content
                  </h3>
                  <p className="text-muted-foreground">
                    We aggregate news from trusted local sources and organize it by topic, 
                    making it easy to find what interests you most.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Community-Driven
                  </h3>
                  <p className="text-muted-foreground">
                    Our platform thrives on community support. Readers like you help us 
                    maintain this free service through optional tips and donations.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Always Free
                  </h3>
                  <p className="text-muted-foreground">
                    We believe access to local news should be free for everyone. 
                    LocalPress will always remain a free service for our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="card p-8 bg-muted/50">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Transparency
                </h3>
                <p className="text-muted-foreground">
                  We clearly attribute all news sources and provide direct links 
                  to original articles.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Accessibility
                </h3>
                <p className="text-muted-foreground">
                  Our platform is designed to be accessible to everyone, 
                  regardless of technical skill or device.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Community
                </h3>
                <p className="text-muted-foreground">
                  We prioritize the needs of local communities and the 
                  stories that matter to them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Questions or Feedback?
            </h2>
            <p className="text-muted-foreground mb-6">
              We'd love to hear from you. Get in touch with any questions, 
              suggestions, or feedback about LocalPress.
            </p>
            <a 
              href="/contact"
              className="btn-primary"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}