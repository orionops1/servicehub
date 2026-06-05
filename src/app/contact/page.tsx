import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Service Hub Sri Lanka'
}

export default function ContactPage() {
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
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">
                  support@servicehubsl.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground">
                  +94 77 123 4567
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">
                  +94 77 123 4567
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How do I register as a service provider?</h3>
                <p className="text-gray-600">
                  Click on &quot;Become a Provider&quot; on the homepage or register page. Fill in your business details and you&apos;ll be able to create your profile immediately.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Is Service Hub free for customers?</h3>
                <p className="text-gray-600">
                  Yes! Service Hub is completely free for customers to browse and contact service providers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">How do I contact a service provider?</h3>
                <p className="text-gray-600">
                  Visit any provider&apos;s profile and click on the WhatsApp or Phone button to contact them instantly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">What are the pricing plans for providers?</h3>
                <p className="text-gray-600">
                  We offer Free, Professional (LKR 2,500/month), and Elite (LKR 5,000/month) plans with different features. Visit our pricing page for details.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">How do reviews work?</h3>
                <p className="text-gray-600">
                  Customers can leave reviews for service providers they&apos;ve worked with. Reviews are moderated to ensure quality and authenticity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands using Service Hub Sri Lanka
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Create Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
