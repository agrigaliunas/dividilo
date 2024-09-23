import React from 'react'
import LoginForm from '../components/forms/LoginForm.jsx';
import { MainCenter } from '../components/MainCenter.jsx';
import { useAuth } from '../contexts/AuthContext.js';
import { Navigate } from 'react-router-dom';

const LoginScreen = () => {
  const {user} = useAuth()
  return user ? (
      <Navigate to="/dashboard" />
  ) : (
    <MainCenter>
      <LoginForm />
    </MainCenter>
  );
};


export default LoginScreen