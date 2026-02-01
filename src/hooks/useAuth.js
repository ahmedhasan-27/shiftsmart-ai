import { useState, useEffect } from 'react';
import api from '../services/api';
import { users } from '../data/users'; // Fallback for demo

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      api.setToken(token);
      // Try to get current user from API
      api.getCurrentUser()
        .then(user => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // If API fails, clear token
          api.setToken(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Try API login first
      const response = await api.login(email, password);
      const user = await api.getCurrentUser();
      setCurrentUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      // Fallback to local demo users if API is not available
      console.warn('API login failed, using demo mode:', error);
      const emailTrimmed = email.trim();
      const passwordTrimmed = password.trim();
      
      const user = users.find(u => u.email === emailTrimmed && u.password === passwordTrimmed);
      
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password. Please try again.' };
      }
    }
  };

  const quickLogin = (userIndex) => {
    const user = users[userIndex];
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    api.setToken(null);
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return {
    isAuthenticated,
    currentUser,
    loading,
    login,
    quickLogin,
    logout
  };
};
