import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Provider Benefits - Service Hub Sri Lanka',
  description: 'Discover the benefits of joining Service Hub Sri Lanka as a service provider',
}

export default function ProviderBenefitsPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary">SERVICE HUB</h1>
            <span className="text-sm text-muted-foreground">Sri Lanka</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm hover:text-primary">
              Home
            </Link>
            <Link href="/search" className="text-sm hover:text-primary">
              Find Services
            </Link>
            <Link href="/provider/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Grow Your Business with Service Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of service providers across Sri Lanka and connect with customers looking for your services
          </p>
          <Link href="/provider/register">
            <Button size="lg" className="text-lg px-8">
              Start Free Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Service Hub?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Reach More Customers</h3>
              <p className="text-gray-600">
                Get discovered by thousands of customers actively searching for services in your area. Our platform connects you with ready-to-buy customers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-4">Grow Your Revenue</h3>
              <p className="text-gray-600">
                Increase your bookings with featured placements, premium listings, and direct customer connections via WhatsApp and phone.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-4">Build Your Reputation</h3>
              <p className="text-gray-600">
                Collect verified reviews and ratings from satisfied customers. Build trust and credibility to stand out from competitors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4">Track Your Performance</h3>
              <p className="text-gray-600">
                Access detailed analytics showing profile views, contact clicks, and customer engagement to optimize your listings.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold mb-4">Manage Everything</h3>
              <p className="text-gray-600">
                Easy-to-use dashboard to manage your services, respond to requests, update profile, and handle all customer interactions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4">Get Started Free</h3>
              <p className="text-gray-600">
                Create your profile and start getting leads for free. Upgrade anytime to access premium features and increased visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              'Professional business profile',
              'Unlimited service listings',
              'Direct customer contact via WhatsApp',
              'Phone click-to-call functionality',
              'Photo gallery for your work',
              'Customer reviews and ratings',
              'Service request notifications',
              'Performance analytics dashboard',
              'Featured placement options',
              'Mobile-friendly profile pages',
              'SEO-optimized listings',
              'Priority customer support',
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start free and upgrade as you grow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                View Pricing Plans
              </Button>
            </Link>
            <Link href="/provider/register">
              <Button size="lg">
                Register Free Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join Service Hub today and start connecting with customers
          </p>
          <Link href="/provider/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Now - It&apos;s Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2026 Service Hub Sri Lanka. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
