import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - LocalPress',
  description: 'Learn how LocalPress protects your privacy and handles your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg prose-gray max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Privacy Policy
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">
                  Information You Provide
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Email address (when subscribing to our newsletter)</li>
                  <li>Zip code (to personalize your news feed)</li>
                  <li>Name and message (when contacting us or leaving tips)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground mt-6">
                  Information We Automatically Collect
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Browser type and version</li>
                  <li>Device information and operating system</li>
                  <li>IP address and general location</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website or source</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                How We Use Your Information
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide personalized local news based on your zip code</li>
                  <li>Send newsletter updates (only if you subscribe)</li>
                  <li>Process tips and donations</li>
                  <li>Respond to your questions and feedback</li>
                  <li>Improve our website and services</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Prevent fraud and ensure platform security</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Information Sharing and Disclosure
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Service Providers:</strong> We work with trusted third-party services for payment processing, email delivery, and analytics</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and the safety of our users</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> When you explicitly consent to sharing your information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Data Security
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Cookies and Tracking
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We use cookies and similar technologies to enhance your experience on our website. 
                  These help us:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Remember your zip code preference</li>
                  <li>Analyze website traffic and user behavior</li>
                  <li>Improve website functionality and performance</li>
                  <li>Provide relevant content and features</li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences. Note that 
                  disabling cookies may affect some website functionality.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Your Rights and Choices
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Ask us to correct any inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from our newsletter at any time</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at privacy@localpress.news.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Third-Party Services
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Our website may contain links to third-party websites or services. This privacy 
                  policy does not apply to these external sites. We encourage you to read the 
                  privacy policies of any third-party services you use.
                </p>
                <p>We currently use the following third-party services:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Payment processors for handling tips and donations</li>
                  <li>Email service providers for newsletter delivery</li>
                  <li>Analytics services to understand website usage</li>
                  <li>Content delivery networks for website performance</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Children's Privacy
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  LocalPress is not intended for children under 13 years of age. We do not 
                  knowingly collect personal information from children under 13. If we become 
                  aware that we have collected personal information from a child under 13, 
                  we will take steps to delete such information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Changes to This Policy
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We may update this privacy policy from time to time to reflect changes in our 
                  practices or for other operational, legal, or regulatory reasons. We will post 
                  the updated policy on this page and update the "Last updated" date.
                </p>
                <p>
                  For significant changes, we may provide additional notice through our website 
                  or email newsletter.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Contact Us
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  If you have any questions about this privacy policy or our privacy practices, 
                  please contact us:
                </p>
                <ul className="space-y-2">
                  <li>Email: privacy@localpress.news</li>
                  <li>Contact form: <a href="/contact" className="text-primary hover:text-primary/80">LocalPress Contact Page</a></li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}