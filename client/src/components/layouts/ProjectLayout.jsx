import React, { useEffect, useState } from "react";
import { ProjectInfo2 } from "../ProjectInfo2";
import { fetchUsersByProjectId, fetchProjectById } from "../../services/ProjectService.js";
import { useAuth } from "../../contexts/AuthContext.js";

const ProjectLayout = ({ projectId }) => {
  const [project, setProject] = useState({});
  const [usuarios, setUsuarios] = useState([]);


  useEffect(() => {
    const loadProject = async () => {
      const projectData = await fetchProjectById(projectId)
      setProject(projectData);
    };
    loadProject();
  }, []);

  
  useEffect(() => {
    const loadUsuarios = async () => {
      const usuariosData = await fetchUsersByProjectId(projectId);
      setUsuarios(usuariosData);
    };
    loadUsuarios();
  }, []);

  return (
    <>
      <ProjectInfo2 proyecto={project} participantesProyecto={usuarios}/>
    </>
  );
};

export default ProjectLayout;
