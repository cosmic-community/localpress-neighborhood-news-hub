import { Metadata } from 'next'
import { Mail, MessageSquare, Building2 } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact LocalPress - Get in Touch',
  description: 'Have questions, feedback, or want to partner with LocalPress? Get in touch with our team.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're here to help. Whether you have questions, feedback, or partnership 
            inquiries, we'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Send us a Message
            </h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Other Ways to Reach Us
            </h2>
            
            <div className="space-y-6">
              {/* General Inquiries */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      General Inquiries
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      For general questions about LocalPress, our services, or how to use the platform.
                    </p>
                    <a 
                      href="mailto:hello@localpress.news"
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      hello@localpress.news
                    </a>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Feedback & Suggestions
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      We value your feedback and suggestions for improving LocalPress.
                    </p>
                    <a 
                      href="mailto:feedback@localpress.news"
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      feedback@localpress.news
                    </a>
                  </div>
                </div>
              </div>

              {/* Partnerships */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Partnerships & Media
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Interested in partnering with us or featuring LocalPress in your publication?
                    </p>
                    <a 
                      href="mailto:partnerships@localpress.news"
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      partnerships@localpress.news
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                Response Time
              </h3>
              <p className="text-sm text-muted-foreground">
                We aim to respond to all inquiries within 24-48 hours during business days. 
                For urgent matters, please include "URGENT" in your subject line.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                How do I add my zip code to LocalPress?
              </h3>
              <p className="text-muted-foreground">
                We're constantly expanding our coverage. If your zip code isn't available yet, 
                please contact us and we'll prioritize adding it to our platform.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Can I submit news tips or stories?
              </h3>
              <p className="text-muted-foreground">
                While we currently aggregate news from established sources, we're always interested 
                in hearing about important local stories. Please reach out with your suggestions.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                How can I support LocalPress?
              </h3>
              <p className="text-muted-foreground">
                LocalPress is supported by the community. You can help by using our "Tip This Site" 
                feature, sharing LocalPress with neighbors, or providing feedback to help us improve.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Is LocalPress available on mobile?
              </h3>
              <p className="text-muted-foreground">
                Yes! LocalPress is designed to work perfectly on all devices. Simply visit our website 
                from any mobile browser for the full experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}