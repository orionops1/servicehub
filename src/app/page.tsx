import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Home',
}

export default function HomePage() {
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
            <Link href="/search" className="text-sm hover:text-primary">
              Find Services
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Trusted Local
            <span className="text-primary block">Service Providers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with verified professionals across Sri Lanka. From electricians to tutors, 
            find the right service provider for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="text-lg px-8">
                Browse Services
              </Button>
            </Link>
            <Link href="/register?role=provider">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Services</h3>
              <p className="text-muted-foreground">
                Browse through hundreds of verified service providers by category and location
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Instantly</h3>
              <p className="text-muted-foreground">
                Contact providers directly via WhatsApp or phone with just one click
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Read Reviews</h3>
              <p className="text-muted-foreground">
                Make informed decisions with ratings and reviews from real customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Electrician', icon: '⚡' },
              { name: 'Plumber', icon: '🔧' },
              { name: 'Home Tutor', icon: '📚' },
              { name: 'Car Mechanic', icon: '🚗' },
              { name: 'Cleaning Services', icon: '🧹' },
              { name: 'Carpenter', icon: '🔨' },
              { name: 'Beauty Services', icon: '💄' },
              { name: 'IT Services', icon: '💻' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/search?category=${category.name.toLowerCase().replace(' ', '-')}`}
                className="bg-white p-6 rounded-lg border hover:border-primary hover:shadow-md transition-all text-center"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <p className="font-medium">{category.name}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/search">
              <Button variant="outline" size="lg">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and service providers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SERVICE HUB</h3>
              <p className="text-gray-400 text-sm">
                Sri Lanka&apos;s trusted marketplace for local services
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/search" className="hover:text-white">Find Services</Link></li>
                <li><Link href="/requests/new" className="hover:text-white">Post Request</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/provider/register" className="hover:text-white">Register Business</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing Plans</Link></li>
                <li><Link href="/provider-benefits" className="hover:text-white">Benefits</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Service Hub Sri Lanka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
