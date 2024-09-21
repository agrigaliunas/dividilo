import React from 'react'
import MyAccountLayout from '../components/layouts/MyAccountLayout.jsx';
import { MainCenter } from '../components/MainCenter.jsx';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';

const AccountScreen = () => {
  const {user} = useAuth()
  return user ? (
    <MainCenter>
      <MyAccountLayout />
    </MainCenter>
  ) : (
    <Navigate to="/register"/>
  );
};

export default AccountScreen;
