import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('rewear_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const users = JSON.parse(localStorage.getItem('rewear_users') || '[]');
    const foundUser = users.find((u: User) => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('rewear_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('rewear_users') || '[]');
    
    if (users.find((u: User) => u.email === email)) {
      return false; // User already exists
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      points: 100, // Starting points
      isAdmin: email === 'admin@rewear.com',
      joinedDate: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('rewear_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('rewear_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rewear_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('rewear_user', JSON.stringify(updatedUser));
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('rewear_users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('rewear_users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};