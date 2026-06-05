import { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing Plans | Service Hub Sri Lanka',
  description: 'Choose the perfect plan for your service business. Free, Professional, and Elite tiers available.',
}

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      tier: 'FREE',
      price: 0,
      period: 'Forever',
      description: 'Perfect for getting started',
      features: [
        'Basic profile listing',
        'Up to 3 services',
        'Limited visibility in search',
        'Basic analytics',
        'Email support',
      ],
      notIncluded: [
        'Featured listing',
        'Priority in search',
        'Profile badge',
        'Gallery upload',
        'Advanced analytics',
        'WhatsApp support',
      ],
      cta: 'Get Started',
      href: '/provider/register',
      highlighted: false,
    },
    {
      name: 'Professional',
      tier: 'PROFESSIONAL',
      price: 2500,
      period: 'per month',
      description: 'For growing businesses',
      features: [
        'Enhanced profile visibility',
        'Unlimited services',
        'PRO badge',
        'Gallery upload (up to 10 images)',
        'Priority in search results',
        'Advanced analytics',
        'Featured in category pages',
        'Email & WhatsApp support',
        'Lead notifications',
        'Custom business hours',
      ],
      notIncluded: [
        'Top placement',
        'Verified badge',
        'Dedicated account manager',
      ],
      cta: 'Upgrade to Pro',
      href: '/provider/register',
      highlighted: true,
    },
    {
      name: 'Elite',
      tier: 'ELITE',
      price: 5000,
      period: 'per month',
      description: 'Maximum visibility & leads',
      features: [
        'Maximum profile visibility',
        'Unlimited services',
        'ELITE verified badge',
        'Unlimited gallery images',
        'Top placement in all searches',
        'Premium analytics & insights',
        'Featured homepage placement',
        'Priority support 24/7',
        'Instant lead notifications',
        'Custom business hours',
        'No platform ads on profile',
        'Dedicated account manager',
        'Monthly performance report',
      ],
      notIncluded: [],
      cta: 'Go Elite',
      href: '/provider/register',
      highlighted: false,
    },
  ]

  const features = [
    {
      category: 'Profile Features',
      items: [
        { name: 'Basic profile listing', free: true, pro: true, elite: true },
        { name: 'Enhanced profile visibility', free: false, pro: true, elite: true },
        { name: 'Profile badge', free: false, pro: true, elite: true },
        { name: 'Verified badge', free: false, pro: false, elite: true },
      ],
    },
    {
      category: 'Services & Gallery',
      items: [
        { name: 'Number of services', free: '3', pro: 'Unlimited', elite: 'Unlimited' },
        { name: 'Gallery images', free: '0', pro: '10', elite: 'Unlimited' },
      ],
    },
    {
      category: 'Visibility & Leads',
      items: [
        { name: 'Search visibility', free: 'Basic', pro: 'Priority', elite: 'Top' },
        { name: 'Featured in categories', free: false, pro: true, elite: true },
        { name: 'Homepage placement', free: false, pro: false, elite: true },
        { name: 'Lead notifications', free: 'Email', pro: 'Email & SMS', elite: 'Instant' },
      ],
    },
    {
      category: 'Analytics & Insights',
      items: [
        { name: 'Basic analytics', free: true, pro: true, elite: true },
        { name: 'Advanced analytics', free: false, pro: true, elite: true },
        { name: 'Performance reports', free: false, pro: false, elite: true },
      ],
    },
    {
      category: 'Support',
      items: [
        { name: 'Email support', free: true, pro: true, elite: true },
        { name: 'WhatsApp support', free: false, pro: true, elite: true },
        { name: 'Priority 24/7 support', free: false, pro: false, elite: true },
        { name: 'Account manager', free: false, pro: false, elite: true },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your business. Start free and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className={`relative rounded-2xl border-2 ${
                plan.highlighted
                  ? 'border-blue-600 shadow-xl scale-105'
                  : 'border-gray-200'
              } bg-white p-8 flex flex-col`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">
                    {plan.price === 0 ? 'Free' : `LKR ${plan.price.toLocaleString()}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Detailed Feature Comparison
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Features
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Free
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                      Professional
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">
                      Elite
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {features.map((section) => (
                    <>
                      <tr key={section.category} className="bg-gray-50">
                        <td
                          colSpan={4}
                          className="px-6 py-3 text-sm font-semibold text-gray-900"
                        >
                          {section.category}
                        </td>
                      </tr>
                      {section.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof item.free === 'boolean' ? (
                              item.free ? (
                                <Check className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )
                            ) : (
                              <span className="text-sm text-gray-600">{item.free}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof item.pro === 'boolean' ? (
                              item.pro ? (
                                <Check className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )
                            ) : (
                              <span className="text-sm text-gray-600">{item.pro}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof item.elite === 'boolean' ? (
                              item.elite ? (
                                <Check className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )
                            ) : (
                              <span className="text-sm text-gray-600">{item.elite}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Can I change my plan later?</h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept credit/debit cards and bank transfers for subscription payments.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Is there a contract or commitment?</h3>
              <p className="text-gray-600">
                No! All plans are month-to-month. You can cancel anytime with no penalties.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">
                We offer a 7-day money-back guarantee on all paid plans if you&apos;re not satisfied.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of service providers on Service Hub Sri Lanka
          </p>
          <Link
            href="/provider/register"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Start Free Today
          </Link>
        </div>
      </div>
    </div>
  )
}
