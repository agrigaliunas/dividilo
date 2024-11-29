import React from "react";
import ProjectsLayout from "../components/layouts/ProjectsLayout.jsx";
import { MainCenter } from "../components/MainCenter.jsx";
import { useAuth } from "../contexts/AuthContext.js";
import { Navigate } from "react-router-dom";
import FinishOnboardingLayout from "../components/layouts/FinishOnboardingLayout.jsx";

export const ProjectsScreen = () => {
  const { user } = useAuth();

  if (user) {
    if (user.finished_onboarding) {
      return (
        <MainCenter>
          <ProjectsLayout />
        </MainCenter>
      );
    } else {
      return (
        <MainCenter>
          <FinishOnboardingLayout pendingUser={user} />
        </MainCenter>
      );
    }
  } else {
    <Navigate to="/home" />;
  }
};
