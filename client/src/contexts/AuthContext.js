import React, { createContext, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
  };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const storeIntoLocalStorage = (userData) => {
    localStorage.setItem('token', JSON.stringify(userData.token)); 
    localStorage.setItem('user', JSON.stringify(userData.user)); 
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, storeIntoLocalStorage, logout }}>
      {children}
    </AuthContext.Provider>
  );
};