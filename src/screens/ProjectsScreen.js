import React from "react";
import ProjectsLayout from "../components/layouts/ProjectsLayout.jsx";
import { MainCenter } from "../components/MainCenter.jsx";
import { useAuth } from "../contexts/AuthContext.js";
import { Navigate } from "react-router-dom";

export const ProjectsScreen = () => {
  const { user } = useAuth();

  return user ? (
    <MainCenter>
      <ProjectsLayout />
    </MainCenter>
  ) : (
    <Navigate to="/" />
  );


};
