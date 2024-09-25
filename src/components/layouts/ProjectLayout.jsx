import React, { useEffect, useState } from "react";
import { ProjectInfo } from "../ProjectInfo";
import { fetchProjects } from "../../services/ProjectService";
import { fetchUsuarios } from "../../services/UserService.js";

const ProjectLayout = ({ projectId }) => {
  const [project, setProject] = useState({});
  const [usuarios, setUsuarios] = useState([]);

  const getProject = async () => {
    const data = await fetchProjects()
    return data.filter((proj) => proj.id === projectId)[0];
  };

  useEffect(() => {
    const loadProject = async () => {
      const projectData = await getProject();
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
