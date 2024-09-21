import React, { useEffect, useState } from "react";
import { ProjectCard } from "../ProjectCard";
import { ProjectInfo } from "../ProjectInfo";

const ProjectLayout = ({ projectId }) => {
  const [project, setProject] = useState({});

  const fetchProject = async () => {
    const data = await fetch("http://localhost:8000/proyectos").then((data) =>
      data.json()
    );
    return data.filter((proj) => proj.id === projectId)[0];
  };

  useEffect(() => {
    const loadProject = async () => {
      const projectData = await fetchProject();
      setProject(projectData);
    };
    loadProject();
  }, []);

  return (
    <>
      <ProjectInfo project={project}/>
    </>
  );
};

export default ProjectLayout;
