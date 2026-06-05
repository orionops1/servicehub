'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ResponseFormProps {
  requestId: string
}

export default function ResponseForm({ requestId }: ResponseFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    message: '',
    quotedPrice: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/requests/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          message: formData.message,
          quotedPrice: formData.quotedPrice ? parseFloat(formData.quotedPrice) : null,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({ message: '', quotedPrice: '' })
        setTimeout(() => {
          router.refresh()
        }, 1000)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to send response')
      }
    } catch (error) {
      setError('Failed to send response. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <p className="text-green-800 font-medium">
          ✓ Response sent successfully!
        </p>
        <p className="text-green-600 text-sm mt-1">
          The customer will be notified of your response.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          Your Message *
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={5}
          placeholder="Introduce yourself and explain how you can help..."
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Include your relevant experience and why you're the best fit for this job.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Quoted Price (Optional)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500">LKR</span>
          <input
            type="number"
            value={formData.quotedPrice}
            onChange={(e) => setFormData({ ...formData, quotedPrice: e.target.value })}
            className="w-full pl-14 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10000"
            min="0"
            step="100"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Provide an estimated price if applicable. You can discuss exact pricing with the customer later.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || !formData.message.trim()}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Send Response'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By responding, you agree to our Terms of Service and will be sharing your contact information with the customer.
      </p>
    </form>
  )
}
