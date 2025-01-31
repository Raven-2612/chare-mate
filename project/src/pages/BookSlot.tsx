import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function BookSlot() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Book a Charging Slot</h1>

        {/* Station Details */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Station Details</h2>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>123 EV Station, MG Road, Bangalore</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>Operating Hours: 9:00 AM - 9:00 PM</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time Slot
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`p-2 text-sm rounded-md border ${
                    selectedTime === time
                      ? 'bg-green-600 text-white border-transparent'
                      : 'border-gray-300 text-gray-700 hover:border-green-500'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Charging Rate</span>
              <span className="font-medium">₹15/kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Booking Fee</span>
              <span className="font-medium">₹50</span>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="mt-8">
          <button
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
            onClick={() => alert('Booking functionality will be implemented here')}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookSlot;