import React from "react";
import RegisterForm from "../components/forms/RegisterForm.jsx";
import { MainCenter } from "../components/MainCenter.jsx";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

const RegisterScreen = () => {
  const { user } = useAuth();
  return user ? (
    <Navigate to="/dashboard" />
  ) : (
    <MainCenter>
      <RegisterForm />
    </MainCenter>
  );
};

export default RegisterScreen;
