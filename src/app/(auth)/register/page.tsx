import { RegisterForm } from '@/components/forms/RegisterForm'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your Service Hub account'
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold text-primary">SERVICE HUB</h1>
              <p className="text-sm text-muted-foreground">Sri Lanka</p>
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Get Started
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Create your account in just a few steps
            </p>
          </div>
          <RegisterForm />
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
