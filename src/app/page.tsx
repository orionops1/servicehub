import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-primary">
            SERVICE HUB SRI LANKA
          </h1>
          <p className="text-2xl text-muted-foreground">
            Find Trusted Local Service Providers
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Your platform is being built! This is the foundation for a modern local service marketplace.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="p-6 border rounded-lg">
              <h3 className="font-bold text-xl mb-2">For Customers</h3>
              <p className="text-muted-foreground">
                Search and discover local services. Contact providers instantly via WhatsApp or phone.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="font-bold text-xl mb-2">For Providers</h3>
              <p className="text-muted-foreground">
                Register your business. Get discovered by thousands of customers looking for services.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="font-bold text-xl mb-2">Service Requests</h3>
              <p className="text-muted-foreground">
                Post your service needs. Providers respond with quotes and availability.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
