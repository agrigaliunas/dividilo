import React from 'react';
import NotificationsLayout from '../components/layouts/NotificationsLayout.jsx';
import { useAuth } from '../contexts/AuthContext.js';
import { Navigate } from 'react-router-dom';

const NotificationsScreen = () => {

    const {user} = useAuth()
    return user ? (
      <NotificationsLayout />
      ) : (
        <Navigate to="/home" />
      );
    
  };

export default NotificationsScreen;
