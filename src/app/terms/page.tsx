import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Service Hub Sri Lanka',
  description: 'Terms of Service for using Service Hub Sri Lanka platform',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Service Hub Sri Lanka (&quot;the Platform&quot;), you accept and agree to be bound by the terms and provision of this agreement.
            If you do not agree to these Terms of Service, please do not use the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p>
            Service Hub Sri Lanka is a marketplace platform that connects service providers with customers seeking services.
            We provide a platform for listing services, searching for providers, and facilitating contact between parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <h3 className="text-xl font-medium mb-2">3.1 Registration</h3>
          <p>
            To access certain features, you must register for an account. You agree to provide accurate, current, and complete information
            during registration and to update such information to keep it accurate, current, and complete.
          </p>
          
          <h3 className="text-xl font-medium mb-2 mt-4">3.2 Account Security</h3>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Provider Responsibilities</h2>
          <p>Service providers using the Platform agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate information about their services, qualifications, and pricing</li>
            <li>Maintain necessary licenses, permits, and insurance required for their services</li>
            <li>Deliver services professionally and in good faith</li>
            <li>Respond promptly to customer inquiries and service requests</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Customer Responsibilities</h2>
          <p>Customers using the Platform agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate information when posting service requests</li>
            <li>Communicate respectfully with service providers</li>
            <li>Pay agreed-upon fees directly to service providers</li>
            <li>Leave honest and fair reviews based on actual experiences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Platform Role</h2>
          <p>
            Service Hub Sri Lanka acts as an intermediary platform only. We do not provide services directly, nor do we employ or control service providers.
            All transactions, agreements, and service delivery occur directly between customers and providers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Fees and Payments</h2>
          <p>
            Premium subscription fees are charged to providers for enhanced features. All fees are non-refundable unless otherwise stated.
            Payment terms and conditions will be clearly stated at the time of purchase.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Content and Intellectual Property</h2>
          <p>
            All content on the Platform, including text, graphics, logos, and software, is the property of Service Hub Sri Lanka or its licensors
            and is protected by intellectual property laws. Users retain ownership of content they submit but grant us a license to use it on the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Prohibited Activities</h2>
          <p>Users must not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Post false, misleading, or fraudulent information</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to the Platform</li>
            <li>Use automated systems to access the Platform without permission</li>
            <li>Post spam or unsolicited advertisements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
          <p>
            The Platform is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy, reliability, or quality of services
            provided by third-party providers. Users engage with providers at their own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Limitation of Liability</h2>
          <p>
            Service Hub Sri Lanka shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use
            of the Platform or services obtained through the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account at any time for violations of these Terms of Service or for any other reason
            at our sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Continued use of the Platform after changes constitutes acceptance
            of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at:
            <br />
            Email: legal@servicehub.lk
            <br />
            Address: Colombo, Sri Lanka
          </p>
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
