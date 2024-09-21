import React from "react";
import { MainCenter } from "../components/MainCenter.jsx";
import ProjectLayout from "../components/layouts/ProjectLayout.jsx";
import { useParams } from "react-router-dom";

export const ProjectScreen = () => {
const { id } = useParams()

  return (
    <MainCenter>
      <ProjectLayout projectId={id}/>
    </MainCenter>
  );
};
