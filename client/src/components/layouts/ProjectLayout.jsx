import React, { useEffect, useState } from "react";
import { ProjectInfo2 } from "../ProjectInfo2";
import { fetchUsersByProjectId, fetchProjectById } from "../../services/ProjectService.js";
import { useAuth } from "../../contexts/AuthContext.js";
import { getExpensesWithTicketsByProjectId } from "../../services/ExpenseService.js";

const ProjectLayout = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const loadProjectData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [projectData, usuariosData, gastosData] = await Promise.all([
          await fetchProjectById(projectId, user.token),
          await fetchUsersByProjectId(projectId, user.token),
          await getExpensesWithTicketsByProjectId(projectId, user.token),
        ]);

        setProject(projectData);
        setUsuarios(usuariosData);
        setGastos(gastosData);
      } catch (err) {
        console.error("Error loading project data:", err);
        setError("Failed to load project data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectData();
  }, [projectId, user.token]);

  const updateProjectState = (updatedProject) => {
    setProject((prevProject) => ({
      ...prevProject,
      ...updatedProject,
    }));
  };

  const updateParticipantsState = (updatedParticipants) => {
    setUsuarios((prevUsers) => ({
      ...prevUsers,
      updatedParticipants
    }))
  }


  if (isLoading) {
    return <div className="lg:text-2xl text-xl font-bold">Cargando proyecto...</div>;
  }

  if (error) {
    return <div className="lg:text-2xl text-xl font-bold">Oopps... Ocurrió un error inesperado. Por favor intenta más tarde o contactanos vía soporte técnico.</div>;
  }

  return (
    <ProjectInfo2
      proyecto={project}
      participantesProyecto={usuarios}
      gastosProyecto={gastos}
      onProjectUpdate={updateProjectState} 
      onParticipantsUpdate={updateParticipantsState}
    />
  );
};

export default ProjectLayout;
