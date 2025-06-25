'use client'

import { useState } from 'react'
import { X, Heart, CreditCard, Coffee } from 'lucide-react'
import { createTip } from '@/lib/cosmic'
import LoadingSpinner from './LoadingSpinner'

interface TipModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TipModal({ isOpen, onClose }: TipModalProps) {
  const [amount, setAmount] = useState<number>(5)
  const [tipperName, setTipperName] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [showPublicly, setShowPublicly] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const presetAmounts = [3, 5, 10, 25, 50]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await createTip({
        amount,
        tipperName: tipperName.trim() || 'Anonymous',
        message: message.trim(),
        email: email.trim(),
        showPublicly
      })

      setIsSuccess(true)
      
      // Reset form
      setTimeout(() => {
        setIsSuccess(false)
        setAmount(5)
        setTipperName('')
        setMessage('')
        setEmail('')
        setShowPublicly(false)
        onClose()
      }, 2000)

    } catch (error) {
      console.error('Error creating tip:', error)
      setError('Failed to process tip. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Support LocalPress
              </h2>
              <p className="text-sm text-muted-foreground">
                Help keep local news free for everyone
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Thank You!
              </h3>
              <p className="text-muted-foreground">
                Your support helps keep LocalPress free and accessible to everyone.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Choose Amount
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        amount === preset
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-border hover:bg-muted'
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="input pl-8 w-full"
                    placeholder="Custom amount"
                  />
                </div>
              </div>

              {/* Tipper Name */}
              <div>
                <label htmlFor="tipperName" className="block text-sm font-medium text-foreground mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  id="tipperName"
                  value={tipperName}
                  onChange={(e) => setTipperName(e.target.value)}
                  className="input w-full"
                  placeholder="Anonymous"
                  maxLength={50}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input w-full h-20 resize-none"
                  placeholder="Thanks for keeping local news free!"
                  maxLength={200}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full"
                  placeholder="your@email.com"
                />
              </div>

              {/* Show Publicly */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showPublicly"
                  checked={showPublicly}
                  onChange={(e) => setShowPublicly(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor="showPublicly" className="text-sm text-foreground">
                  Show my name and message publicly (optional)
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Note */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Coffee className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground font-medium mb-1">
                      Your support matters
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This is a demonstration tip form. In a real implementation, 
                      this would integrate with Stripe, PayPal, or Buy Me a Coffee 
                      for secure payment processing.
                    </p>
                  </div>
                </div>
              </div>

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
                    <CreditCard className="h-4 w-4" />
                    <span>Send ${amount} Tip</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}