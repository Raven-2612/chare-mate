import React from 'react';
import { Zap, Shield, Clock, Phone } from 'lucide-react';

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About EV Finder</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're committed to making electric vehicle charging accessible and convenient for everyone.
          Our platform helps you find and book charging stations across India with ease.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <FeatureCard
          icon={<Zap className="h-8 w-8 text-green-600" />}
          title="Fast Charging"
          description="Access to high-speed charging stations for quick power-ups"
        />
        <FeatureCard
          icon={<Shield className="h-8 w-8 text-green-600" />}
          title="Secure Booking"
          description="Safe and secure slot booking system with instant confirmation"
        />
        <FeatureCard
          icon={<Clock className="h-8 w-8 text-green-600" />}
          title="24/7 Access"
          description="Round-the-clock access to charging stations across the country"
        />
        <FeatureCard
          icon={<Phone className="h-8 w-8 text-green-600" />}
          title="Support"
          description="Dedicated customer support to assist you anytime"
        />
      </div>

      {/* Mission Statement */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          At EV Finder, we envision a future where electric vehicle charging is as convenient as traditional refueling. 
          Our mission is to accelerate the adoption of electric vehicles by providing a seamless charging experience 
          through our innovative station finder and booking platform. We're committed to supporting India's transition 
          to sustainable transportation by making EV charging accessible, reliable, and user-friendly.
        </p>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Have questions or need assistance? Our support team is here to help.
        </p>
        <div className="space-y-2">
          <p className="text-gray-600">Email: support@evfinder.com</p>
          <p className="text-gray-600">Phone: +91 1234567890</p>
          <p className="text-gray-600">Address: 123 Tech Park, Electronic City, Bangalore - 560100</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center text-sm">{description}</p>
    </div>
  );
}

export default About;