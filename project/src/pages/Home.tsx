import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Battery, Shield, Zap, Clock } from 'lucide-react';

function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Find and Book EV Charging Stations Near You
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Locate available charging stations, book your slot, and charge your EV hassle-free across India.
            </p>
            <div className="flex gap-4">
              <Link
                to="/find-station"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Find Stations
                <MapPin className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/book-slot"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-gray-900 transition-colors"
              >
                Book a Slot
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Simple steps to get your EV charged</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin className="h-8 w-8 text-green-600" />}
              title="Find Stations"
              description="Locate nearby charging stations with real-time availability updates"
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-green-600" />}
              title="Book Your Slot"
              description="Reserve your charging slot in advance to avoid waiting"
            />
            <FeatureCard
              icon={<Battery className="h-8 w-8 text-green-600" />}
              title="Charge & Go"
              description="Charge your EV at your convenience with our seamless booking system"
            />
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="mt-4 text-lg text-gray-600">Experience the best in EV charging convenience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Shield className="h-6 w-6 text-green-600" />}
              title="Secure Booking"
              description="Safe and encrypted transactions with instant confirmation"
            />
            <BenefitCard
              icon={<Zap className="h-6 w-6 text-green-600" />}
              title="Fast Charging"
              description="Access to high-speed charging stations for quick power-ups"
            />
            <BenefitCard
              icon={<Clock className="h-6 w-6 text-green-600" />}
              title="24/7 Support"
              description="Round-the-clock customer service for assistance"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-green-100 mb-8">
              Join thousands of EV owners who trust us for their charging needs
            </p>
            <Link
              to="/find-station"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-green-600 transition-colors"
            >
              Find Nearest Station
              <MapPin className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">
        <div className="p-3 bg-green-50 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default Home;