import React from "react";
import { MainCenter } from "../components/MainCenter.jsx";
import ProjectLayout from "../components/layouts/ProjectLayout.jsx";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

export const ProjectScreen = () => {
  const { id } = useParams();
  const { user } = useAuth();

  return user ? (
    <MainCenter>
      <ProjectLayout projectId={id}/>
    </MainCenter>
  ) : (
    <Navigate to="/" />
  );
};
