import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Service Hub Sri Lanka and our mission to connect customers with trusted service providers'
}

export default function AboutPage() {
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
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Service Hub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sri Lanka&apos;s trusted marketplace connecting customers with verified local service providers
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              To revolutionize how Sri Lankans discover and connect with quality service providers by creating a transparent, trustworthy, and efficient marketplace that benefits both customers and service professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
              <p className="text-gray-600">
                We verify providers and showcase real customer reviews to build trust in every transaction
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Speed & Efficiency</h3>
              <p className="text-gray-600">
                Instant contact via WhatsApp and phone means customers can connect with providers immediately
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">Quality Service</h3>
              <p className="text-gray-600">
                We empower service providers with tools to showcase their work and grow their business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600">Service Providers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-gray-600">Service Categories</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25</div>
              <p className="text-gray-600">Districts Covered</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Service Hub Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you&apos;re looking for services or offering them, we&apos;re here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" variant="secondary">
                Find Services
              </Button>
            </Link>
            <Link href="/register?role=provider">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
