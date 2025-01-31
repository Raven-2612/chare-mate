import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, LogOut } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { supabase } from '../lib/supabase';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-green-600' : 'text-gray-600 hover:text-green-600';
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Zap className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EV Finder</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/find-station" className={`${isActive('/find-station')} font-medium transition-colors`}>
              Find Stations
            </Link>
            <Link to="/book-slot" className={`${isActive('/book-slot')} font-medium transition-colors`}>
              Book a Slot
            </Link>
            <Link to="/about" className={`${isActive('/about')} font-medium transition-colors`}>
              About
            </Link>
            {user ? (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;