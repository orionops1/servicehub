import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Service Hub Sri Lanka',
  description: 'Privacy Policy for Service Hub Sri Lanka',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Service Hub Sri Lanka ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-medium mb-2">2.1 Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
            <li><strong>Provider Information:</strong> Business name, address, services offered, qualifications, licenses</li>
            <li><strong>Profile Content:</strong> Photos, descriptions, service details</li>
            <li><strong>Communications:</strong> Messages, reviews, service requests</li>
            <li><strong>Payment Information:</strong> Billing details for premium subscriptions</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-4">2.2 Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Data:</strong> Pages visited, features used, search queries</li>
            <li><strong>Device Information:</strong> IP address, browser type, device type, operating system</li>
            <li><strong>Location Data:</strong> Approximate location based on IP address</li>
            <li><strong>Cookies and Tracking:</strong> Session data, preferences, analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>We use collected information for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing and maintaining the Platform services</li>
            <li>Creating and managing user accounts</li>
            <li>Facilitating connections between customers and providers</li>
            <li>Processing payments and subscriptions</li>
            <li>Sending notifications, updates, and marketing communications</li>
            <li>Analyzing usage patterns and improving our services</li>
            <li>Detecting and preventing fraud and abuse</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
          
          <h3 className="text-xl font-medium mb-2">4.1 Public Information</h3>
          <p>
            Provider profiles, including business name, services, contact information, and reviews, are publicly visible on the Platform.
          </p>

          <h3 className="text-xl font-medium mb-2 mt-4">4.2 Service Providers</h3>
          <p>
            We may share information with third-party service providers who assist in operating the Platform, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cloud hosting providers (Vercel, Neon Database)</li>
            <li>Payment processors (Stripe)</li>
            <li>Analytics services (Google Analytics, PostHog)</li>
            <li>Email service providers</li>
            <li>Image storage providers (Cloudinary)</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-4">4.3 Legal Requirements</h3>
          <p>
            We may disclose information if required by law, court order, or government request, or to protect our rights, property, or safety.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Secure password hashing</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
            <li>Secure data centers and infrastructure</li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Access:</strong> Request a copy of your personal information</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            <li><strong>Data Portability:</strong> Request your data in a portable format</li>
            <li><strong>Object:</strong> Object to certain processing of your information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content.
            You can control cookies through your browser settings, but disabling cookies may limit functionality.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-4">Types of Cookies We Use:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for basic Platform functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand user behavior</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            <li><strong>Marketing Cookies:</strong> Deliver relevant advertisements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
          <p>
            The Platform may contain links to third-party websites. We are not responsible for the privacy practices of these sites.
            We encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
          <p>
            Our Platform is not intended for users under 18 years of age. We do not knowingly collect information from children.
            If we learn we have collected information from a child, we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Data Retention</h2>
          <p>
            We retain your information for as long as necessary to provide services, comply with legal obligations, resolve disputes,
            and enforce agreements. Account information is deleted within 90 days of account closure, unless retention is required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than Sri Lanka. We ensure appropriate safeguards
            are in place to protect your information in accordance with this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page
            and updating the "Last Updated" date. Continued use constitutes acceptance of changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
          <p>
            For questions, concerns, or requests regarding this Privacy Policy or your personal information, contact us at:
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p><strong>Email:</strong> privacy@servicehub.lk</p>
            <p><strong>Phone:</strong> +94 11 123 4567</p>
            <p><strong>Address:</strong> Service Hub Sri Lanka, Colombo, Sri Lanka</p>
          </div>
        </section>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-gray-600">
            Last Updated: June 5, 2026
          </p>
        </div>
      </div>
    </div>
  )
}
