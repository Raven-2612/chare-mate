import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sample charging stations data
const allChargingStations = [
  {
    id: 1,
    name: 'EV Charging Hub - MG Road',
    position: [12.9716, 77.5946], // Bangalore coordinates
    address: 'MG Road, Bangalore',
    chargerTypes: ['Level 2', 'DC Fast'],
    available: true,
  },
  {
    id: 2,
    name: 'Green Charge Station',
    position: [12.9769, 77.5993],
    address: 'Indiranagar, Bangalore',
    chargerTypes: ['Level 2'],
    available: true,
  },
  {
    id: 3,
    name: 'FastCharge EV Point',
    position: [12.9780, 77.6050],
    address: 'Koramangala, Bangalore',
    chargerTypes: ['DC Fast'],
    available: false,
  },
  // Add more stations in different areas
  {
    id: 4,
    name: 'EcoCharge Station',
    position: [12.9850, 77.5700],
    address: 'Malleshwaram, Bangalore',
    chargerTypes: ['Level 2', 'DC Fast'],
    available: true,
  },
  {
    id: 5,
    name: 'PowerUp EV Station',
    position: [12.9550, 77.5900],
    address: 'JP Nagar, Bangalore',
    chargerTypes: ['Level 2'],
    available: true,
  }
];

// Component to update map center when search changes
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

function FindStation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    distance: '5',
    chargerType: 'all',
  });
  const [center, setCenter] = useState<[number, number]>([12.9716, 77.5946]); // Bangalore center
  const [filteredStations, setFilteredStations] = useState(allChargingStations);
  const searchTimeoutRef = useRef<number>();

  // Function to simulate geocoding (in real app, use a geocoding service)
  const simulateGeocode = (query: string) => {
    // Simple simulation - just find a station that matches the query
    const matchingStation = allChargingStations.find(station => 
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.address.toLowerCase().includes(query.toLowerCase())
    );

    if (matchingStation) {
      return matchingStation.position;
    }
    return center; // Default to current center if no match
  };

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = window.setTimeout(() => {
      if (searchQuery) {
        const newCenter = simulateGeocode(searchQuery);
        setCenter(newCenter);

        // Filter stations based on search and current filters
        const filtered = allChargingStations.filter(station => {
          const matchesSearch = 
            station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            station.address.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesType = 
            filters.chargerType === 'all' ||
            station.chargerTypes.some(type => 
              type.toLowerCase().includes(filters.chargerType.toLowerCase())
            );

          // Simple distance calculation (in a real app, use proper distance calculation)
          const distance = Math.sqrt(
            Math.pow(station.position[0] - newCenter[0], 2) +
            Math.pow(station.position[1] - newCenter[1], 2)
          ) * 111; // Rough conversion to kilometers

          const matchesDistance = distance <= parseInt(filters.distance);

          return matchesSearch && matchesType && matchesDistance;
        });

        setFilteredStations(filtered);
      } else {
        setFilteredStations(allChargingStations);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, filters]);

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

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distance Range
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                  value={filters.distance}
                  onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
                >
                  <option value="1">Within 1 km</option>
                  <option value="5">Within 5 km</option>
                  <option value="10">Within 10 km</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Charger Type
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                  value={filters.chargerType}
                  onChange={(e) => setFilters({ ...filters, chargerType: e.target.value })}
                >
                  <option value="all">All Types</option>
                  <option value="level2">Level 2</option>
                  <option value="dc-fast">DC Fast Charger</option>
                </select>
              </div>
            </div>
          </div>

          {/* Station List */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Nearby Stations ({filteredStations.length})
            </h3>
            <div className="space-y-4">
              {filteredStations.map((station) => (
                <div key={station.id} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">{station.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{station.address}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {station.chargerTypes.map((type) => (
                      <span key={type} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {type}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2">
                    <span className={`text-sm ${station.available ? 'text-green-600' : 'text-red-600'}`}>
                      {station.available ? '● Available' : '● Occupied'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px]">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={center} />
              {filteredStations.map((station) => (
                <Marker key={station.id} position={station.position as [number, number]}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-medium text-gray-900">{station.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{station.address}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {station.chargerTypes.map((type) => (
                          <span key={type} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {type}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2">
                        <span className={`text-sm ${station.available ? 'text-green-600' : 'text-red-600'}`}>
                          {station.available ? '● Available' : '● Occupied'}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindStation;