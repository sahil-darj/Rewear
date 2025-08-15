import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { FaTshirt } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaTshirt className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">ReWear</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Browse Items
            </Link>
            {user && (
              <>
                <Link to="/add-item" className="text-gray-700 hover:text-emerald-600 transition-colors">
                  List Item
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-emerald-600 transition-colors">
                  Dashboard
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-emerald-600 transition-colors">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                    {user.points} pts
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                to="/browse"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Items
              </Link>
              {user ? (
                <>
                  <Link
                    to="/add-item"
                    className="text-gray-700 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    List Item
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-emerald-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-gray-700">{user.name}</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                      {user.points} pts
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-3 border-t">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};