<<<<<<< HEAD
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { FaTshirt } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
export const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
=======
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
      return;
    }

    if (password.length < 6) {
<<<<<<< HEAD
      setError("Password must be at least 6 characters long");
=======
      setError('Password must be at least 6 characters long');
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(email, password, name);
      if (success) {
<<<<<<< HEAD
        navigate("/dashboard");
      } else {
        setError("Email already exists or signup failed");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
=======
        navigate('/dashboard');
      } else {
        setError('Email already exists or signup failed');
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
<<<<<<< HEAD
              <FaTshirt className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">ReWear</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Join ReWear</h2>
            <p className="text-gray-600 mt-2">
              Create your account and start swapping sustainably
            </p>
=======
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">ReWear</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Join ReWear</h2>
            <p className="text-gray-600 mt-2">Create your account and start swapping sustainably</p>
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />

            <div className="relative">
              <Input
                label="Password"
<<<<<<< HEAD
                type={showPassword ? "text" : "password"}
=======
                type={showPassword ? 'text' : 'password'}
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              >
<<<<<<< HEAD
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
=======
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
              </button>
            </div>

            <Input
              label="Confirm Password"
<<<<<<< HEAD
              type={showPassword ? "text" : "password"}
=======
              type={showPassword ? 'text' : 'password'}
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

<<<<<<< HEAD
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
=======
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
<<<<<<< HEAD
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
=======
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 6962701a1731b4203e0576b39161499b78f56445
