import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { ProviderRegistrationForm } from '@/components/forms/ProviderRegistrationForm'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Register Your Business',
}

export default async function ProviderRegisterPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Check if user already has a provider profile
  const existingProvider = await prisma.provider.findUnique({
    where: { userId: session.user.id }
  })

  if (existingProvider) {
    redirect('/provider/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Register Your Business</h1>
              <p className="text-muted-foreground">
                Create your professional profile and start connecting with customers across Sri Lanka
              </p>
            </div>
            <ProviderRegistrationForm />
          </div>
        </div>
      </div>
    </div>
  )
}
