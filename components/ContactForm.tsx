'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { isValidEmail } from '@/lib/utils'
import LoadingSpinner from './LoadingSpinner'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Validate form
    if (!formData.name.trim()) {
      setError('Please enter your name')
      setIsSubmitting(false)
      return
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address')
      setIsSubmitting(false)
      return
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    if (!formData.subject.trim()) {
      setError('Please enter a subject')
      setIsSubmitting(false)
      return
    }

    if (!formData.message.trim()) {
      setError('Please enter your message')
      setIsSubmitting(false)
      return
    }

    try {
      // In a real implementation, this would send the message via API
      // For demo purposes, we'll simulate sending the message
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        setIsSuccess(false)
      }, 3000)

    } catch (error) {
      console.error('Contact form error:', error)
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="card p-8 text-center">
        <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-muted-foreground">
          Thank you for contacting us. We'll get back to you within 24-48 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input w-full"
            placeholder="John Doe"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input w-full"
            placeholder="john@example.com"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="input w-full"
            disabled={isSubmitting}
            required
          >
            <option value="">Select a subject</option>
            <option value="general">General Question</option>
            <option value="feedback">Feedback</option>
            <option value="bug">Report a Bug</option>
            <option value="feature">Feature Request</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="press">Press Inquiry</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="input w-full resize-none"
            placeholder="Tell us how we can help you..."
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </button>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center">
          * Required fields. We'll respond within 24-48 hours during business days.
        </p>
      </form>
    </div>
  )
}