import React from "react";
import { MainCenter } from "../components/MainCenter.jsx";
import ProjectLayout from "../components/layouts/ProjectLayout.jsx";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import AdminPanelLayout from "../components/layouts/AdminPanelLayout.jsx";

const ROLE_ADMIN = "admin";

export const AdminPanelScreen = () => {
  const { user } = useAuth();

  return (user && (user.rol === ROLE_ADMIN)) ? (
    <MainCenter>
      <AdminPanelLayout />
    </MainCenter>
  ) : (
    <Navigate to="/register" />
  );
};
