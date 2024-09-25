import React from 'react'
import MyAccountLayout from '../components/layouts/MyAccountLayout.jsx';
import { MainCenter } from '../components/MainCenter.jsx';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import ForgotPasswordLayout from '../components/layouts/ForgotPasswordLayout.jsx';

const ForgotPasswordScreen = () => {
  const {user} = useAuth()
  return !user ? (
    <MainCenter>
      <ForgotPasswordLayout />
    </MainCenter>
  ) : (
    <Navigate to="/my-account"/>
  );
};

export default ForgotPasswordScreen;
