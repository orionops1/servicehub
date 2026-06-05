import { Metadata } from 'next'
import Link from 'next/link'
import { Search, UserPlus, MessageCircle, Star, CheckCircle, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works | Service Hub Sri Lanka',
  description: 'Learn how to find trusted service providers or grow your service business on Service Hub Sri Lanka',
}

export default function HowItWorksPage() {
  const forCustomers = [
    {
      icon: Search,
      title: 'Search for Services',
      description: 'Browse through 100+ service categories or search by location to find providers near you.',
    },
    {
      icon: UserPlus,
      title: 'View Provider Profiles',
      description: 'Check ratings, reviews, services offered, and contact information of verified providers.',
    },
    {
      icon: MessageCircle,
      title: 'Contact Instantly',
      description: 'Reach out via WhatsApp, phone, or post a service request for providers to respond to.',
    },
    {
      icon: Star,
      title: 'Leave Reviews',
      description: 'Share your experience and help others make informed decisions.',
    },
  ]

  const forProviders = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Register your business with detailed information about your services and coverage areas.',
    },
    {
      icon: TrendingUp,
      title: 'Get Discovered',
      description: 'Appear in search results when customers look for your services in your area.',
    },
    {
      icon: MessageCircle,
      title: 'Receive Requests',
      description: 'Get notified when customers post service requests matching your expertise.',
    },
    {
      icon: CheckCircle,
      title: 'Grow Your Business',
      description: 'Build your reputation, get reviews, and upgrade to premium tiers for more visibility.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Service Hub Works
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Connecting customers with trusted local service providers across Sri Lanka
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* For Customers */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              For Customers
            </h2>
            <p className="text-xl text-gray-600">
              Find and hire trusted service providers in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {forCustomers.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-blue-600 mb-2">
                    STEP {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/search"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Start Searching
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200 my-16"></div>

        {/* For Providers */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              For Service Providers
            </h2>
            <p className="text-xl text-gray-600">
              Grow your business and reach more customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {forProviders.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                  <step.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-green-600 mb-2">
                    STEP {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/provider/register"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              Register as Provider
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Platform Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-gray-600">
                Filter by category, location, ratings, and pricing to find exactly what you need.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">
                All providers are reviewed and verified to ensure quality service.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Reviews & Ratings</h3>
              <p className="text-gray-600">
                Read genuine reviews from other customers to make informed decisions.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Instant Contact</h3>
              <p className="text-gray-600">
                Connect via WhatsApp, phone, or email with a single click.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Providers get detailed insights on profile views and customer interactions.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Growth Tools</h3>
              <p className="text-gray-600">
                Premium plans offer enhanced visibility and lead generation features.
              </p>
            </div>
          </div>
        </section>

        {/* Service Request Feature */}
        <section className="mb-20">
          <div className="bg-blue-600 text-white rounded-2xl p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Post a Service Request
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Can&apos;t find what you&apos;re looking for? Post your requirement and let providers come to you!
              </p>
              <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong>Describe your need</strong> - Share details about the service you require
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong>Set your budget</strong> - Let providers know your price range
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong>Receive responses</strong> - Multiple providers will reach out with quotes
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong>Choose the best</strong> - Compare and select the provider that fits your needs
                  </div>
                </div>
              </div>
              <Link
                href="/requests"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Post a Request
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details className="bg-white rounded-lg shadow p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                Is Service Hub free to use for customers?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! Browsing, searching, and contacting providers is completely free for customers. You only pay the service provider directly for their services.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                How are providers verified?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                All providers go through a verification process where we check their business information and credentials. Verified providers get a badge on their profile.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                What if I&apos;m not satisfied with a service?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Service Hub connects you with providers but doesn&apos;t provide services directly. If you have issues, communicate with the provider first. You can leave an honest review to help other customers.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                How much does it cost for providers to register?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                We offer a free plan for basic listings. Premium plans (Professional at LKR 2,500/month and Elite at LKR 5,000/month) offer enhanced visibility and features. <Link href="/pricing" className="text-blue-600 hover:underline">View pricing details</Link>
              </p>
            </details>

            <details className="bg-white rounded-lg shadow p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                Can I post multiple service requests?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! You can post as many service requests as you need. Each request stays active until you mark it as completed or 30 days have passed.
              </p>
            </details>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users on Service Hub Sri Lanka
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Find Services
            </Link>
            <Link
              href="/provider/register"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              Become a Provider
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
