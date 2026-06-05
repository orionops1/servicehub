'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="max-w-md w-full">
        <CardHeader>
          <Link href="/" className="text-center block mb-4">
            <h1 className="text-2xl font-bold text-primary">SERVICE HUB</h1>
            <p className="text-sm text-muted-foreground">Sri Lanka</p>
          </Link>
          <CardTitle className="text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="your@email.com"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="text-center">
                <Link href="/login" className="text-sm text-primary hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="font-semibold">Check Your Email</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;ve sent a password reset link to <strong>{email}</strong>. 
                Please check your email and follow the instructions.
              </p>
              <p className="text-xs text-muted-foreground">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
