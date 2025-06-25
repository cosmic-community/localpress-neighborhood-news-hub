'use client'

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { isValidEmail, isValidZipCode, sanitizeZipCode } from '@/lib/utils'
import LoadingSpinner from './LoadingSpinner'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address')
      setIsSubmitting(false)
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    // Validate zip code if provided
    const cleanZipCode = sanitizeZipCode(zipCode)
    if (cleanZipCode && !isValidZipCode(cleanZipCode)) {
      setError('Please enter a valid zip code')
      setIsSubmitting(false)
      return
    }

    try {
      // In a real implementation, this would call an API to subscribe the user
      // For demo purposes, we'll simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setEmail('')
        setZipCode('')
        setIsSuccess(false)
      }, 3000)

    } catch (error) {
      console.error('Newsletter signup error:', error)
      setError('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeZipCode(e.target.value)
    setZipCode(value)
    if (error) setError('')
  }

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Stay Informed
          </h2>
          <p className="text-lg text-muted-foreground">
            Get the latest local news delivered to your inbox. 
            Subscribe to our newsletter for weekly updates from your neighborhood.
          </p>
        </div>

        {/* Form */}
        {isSuccess ? (
          <div className="bg-background rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-center gap-3 text-green-600 mb-4">
              <CheckCircle className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Successfully Subscribed!</h3>
            </div>
            <p className="text-muted-foreground">
              Thank you for subscribing. You'll receive weekly local news updates in your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Email Input */}
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className="input w-full"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Zip Code Input */}
              <div className="sm:w-40">
                <input
                  type="text"
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  placeholder="Zip code (optional)"
                  className="input w-full"
                  disabled={isSubmitting}
                  maxLength={10}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="btn-primary px-6 whitespace-nowrap flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-left">
                {error}
              </div>
            )}

            {/* Privacy Note */}
            <p className="text-xs text-muted-foreground text-left">
              We respect your privacy. Unsubscribe at any time. Read our{' '}
              <a href="/privacy" className="text-primary hover:text-primary/80 underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}

        {/* Benefits */}
        {!isSuccess && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-foreground mb-2">Weekly Updates</h4>
              <p className="text-sm text-muted-foreground">
                Get a weekly digest of the most important local news
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-foreground mb-2">No Spam</h4>
              <p className="text-sm text-muted-foreground">
                Only relevant local news, no promotional emails
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-foreground mb-2">Easy Unsubscribe</h4>
              <p className="text-sm text-muted-foreground">
                Cancel your subscription anytime with one click
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}