'use client'

import { useState } from 'react'
import { Heart, X, CreditCard } from 'lucide-react'
import TipModal from './TipModal'

export default function TipButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* Floating Tip Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40 group"
        aria-label="Tip this site"
      >
        <Heart className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-12 right-0 bg-background text-foreground px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-border whitespace-nowrap">
          Tip This Site
        </span>
      </button>

      {/* Tip Modal */}
      <TipModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}