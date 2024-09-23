import React, { useEffect, useState } from "react";
import { ProjectCard } from "../ProjectCard";
import { ProjectInfo } from "../ProjectInfo";

const ProjectLayout = ({ projectId }) => {
  const [project, setProject] = useState({});
  const [usuarios, setUsuarios] = useState([]);

  const fetchProject = async () => {
    const data = await fetch("http://localhost:8000/proyectos").then((data) =>
      data.json()
    );
    return data.filter((proj) => proj.id === projectId)[0];
  };

  const fetchUsuarios = async () => {
    const data = await fetch("http://localhost:8000/usuarios").then((data) =>
      data.json()
    );
    return data
  };

  useEffect(() => {
    const loadProject = async () => {
      const projectData = await fetchProject();
      setProject(projectData);
    };
    loadProject();
  }, []);

  
  useEffect(() => {
    const loadUsuarios = async () => {
      const usuariosData = await fetchUsuarios();
      setUsuarios(usuariosData);
    };
    loadUsuarios();
  }, []);

  return (
    <>
      <ProjectInfo project={project} usuarios={usuarios}/>
    </>
  );
};

export default ProjectLayout;
