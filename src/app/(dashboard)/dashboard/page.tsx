import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome back, {session.user.name}!</h2>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              <span className="font-medium">Email:</span> {session.user.email}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium">Role:</span> {session.user.role}
            </p>
          </div>
        </div>

        {session.user.role === 'PROVIDER' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Create Your Profile</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Set up your business profile to start receiving customer requests
              </p>
              <a 
                href="/provider/register" 
                className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Get Started
              </a>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profile Views</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Requests</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Reviews</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {session.user.role === 'CUSTOMER' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Find Services</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse and connect with service providers
              </p>
              <a 
                href="/search" 
                className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Search Now
              </a>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Post a Request</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let providers come to you with quotes
              </p>
              <a 
                href="/requests/new" 
                className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Create Request
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
