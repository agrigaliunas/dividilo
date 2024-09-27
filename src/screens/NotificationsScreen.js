import React from 'react';
import NotificationsLayout from '../components/layouts/NotificationsLayout.jsx';
import { useAuth } from '../contexts/AuthContext.js';
import { MainCenter } from '../components/MainCenter.jsx';
import { Navigate } from 'react-router-dom';

const NotificationsScreen = () => {

    const {user} = useAuth()
    return user ? (
      <NotificationsLayout />
      ) : (
        <Navigate to="/" />
      );
    
  };

export default NotificationsScreen;
