import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectTitle } from "./cards/ProjectTitle";
import { EditProjectButton } from "./buttons/EditProjectButton";
import { ProjectTotalAmount } from "./cards/ProjectTotalAmount";
import { ProjectParticipants } from "./cards/ProjectParticipants";
import { ProjectExpenses } from "./cards/ProjectExpenses";
import { ProjectEditToolbar } from "./cards/ProjectEditToolbar";
import {
  agregarParticipanteAlProyecto,
  deleteProject,
  eliminarParticipanteDelProyecto,
  updateProject,
} from "../services/ProjectService";
import { useAuth } from "../contexts/AuthContext";
import NewParticipantModal from "./modals/NewParcitipantModal";
import { fetchUsuarioByEmail } from "../services/UserService";
import NewGastoModal from "./modals/NewGastoModal";
import NewTicketModal from "./modals/NewTicketModal";

export const ProjectInfo2 = ({
  proyecto,
  participantesProyecto,
  gastosProyecto,
  onProjectUpdate,
  onParticipantsUpdate,
}) => {
  const [project, setProject] = useState(proyecto);
  const [participants, setParticipants] = useState(participantesProyecto);
  const [expenses, setExpenses] = useState(gastosProyecto);

  const [editandoProyectoMode, setEditandoProyectoMode] = useState(false);

  const [modalParticipanteIsOpen, setModalParticipanteIsOpen] = useState(false);
  const [modalGastoIsOpen, setModalGastoIsOpen] = useState(false);
  const [modalTicketIsOpen, setModalTicketIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChangeProjectStatus = (newStatus) => {
    setProject((prevProject) => ({ ...prevProject, state: newStatus }));
    onProjectUpdate({ ...project, state: newStatus });
  };

  const handleSaveProject = async () => {
    try {
      const savedProject = await updateProject(
        project.project_id,
        project.title,
        project.description,
        project.state,
        user.token
      );

      setProject(project);
      onProjectUpdate(project);
      setEditandoProyectoMode(false);
    } catch (error) {
      console.error("Error al guardar el proyecto:", error);
      alert("No se pudo guardar el proyecto. Por favor, inténtalo de nuevo.");
    }
  };

  const handleDeleteProject = async () => {
    const response = await deleteProject(project.project_id);

    if (response.status === 200) {
      setEditandoProyectoMode(false);
      navigate("/dashboard");
    }
  };

  const handleEditProjectClick = useCallback(() => {
    setEditandoProyectoMode((prevState) => !prevState);
  }, []);

  const openParticipanteModal = () => {
    setModalParticipanteIsOpen(true);
  };

  const closeParticipanteModal = () => {
    setModalParticipanteIsOpen(false);
  };

  const openGastoModal = () => {
    setModalGastoIsOpen(true);
  };

  const closeGastoModal = () => {
    setModalGastoIsOpen(false);
  };

  const openTicketModal = (gastoIndex) => {
    setModalTicketIsOpen(true);
  };

  const closeTicketModal = () => {
    setModalTicketIsOpen(false);
  };

  const handleAddParticipant = async (email) => {
    try {
      const response = await agregarParticipanteAlProyecto(
        project.project_id,
        email
      );

      const participant = await fetchUsuarioByEmail(email);

      if (response.status === 200 && participant) {
        setParticipants((prevParticipants) => {
          const updatedParticipants = [...prevParticipants, participant];
          return updatedParticipants;
        });

        onParticipantsUpdate(participants);

        closeParticipanteModal();
      }
    } catch (error) {
      console.error("Error al agregar participante:", error);
      alert(
        "No se pudo agregar el participante. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleDeleteParticipant = async (userId) => {
    const response = await eliminarParticipanteDelProyecto(
      project.project_id,
      userId
    );
    if (response.status === 200) {
      setParticipants((prevData) =>
        prevData.filter((p) => p.user_id !== userId)
      );
      onParticipantsUpdate(participants);
      // TODO: actualizar split ticket del participante
    }
  };

  const handleAddGasto = (newExpense) => {
    setExpenses((prevData) => ({
      ...prevData,
      newExpense,
    }));
  };

  const getParticipanteNombreApellido = useCallback(
    (participanteId) => {
      const usuario = participantesProyecto.find(
        (user) => user.user_id === participanteId
      );
      return usuario?.initials || "Desconocido";
    },
    [participantesProyecto]
  );

  // const calcularGastoParticipante = useCallback(
  //   (participanteId) => {
  //     const totalGasto = gastosProyecto.reduce((acc, gasto) => {
  //       const tickets = gasto.tickets || [];
  //       const ticketGasto = tickets.reduce((sum, ticket) => {
  //         const split = ticket.split.find(
  //           (s) => s.participanteId === participanteId
  //         );
  //         return (
  //           sum +
  //           (split ? (ticket.montoTotalTicket * split.porcentaje) / 100 : 0)
  //         );
  //       }, 0);
  //       return acc + ticketGasto;
  //     }, 0);

  //     const balance =
  //       proyecto.montoTotalProyecto / participantesProyecto.length - totalGasto;

  //     return balance < 0
  //       ? { texto: `+ $${Math.abs(balance)}`, color: "text-green-500" }
  //       : balance === 0
  //       ? { texto: `$0.00`, color: "text-gray-500" }
  //       : { texto: `- $${balance}`, color: "text-red-500" };
  //   },
  //   [gastosProyecto, proyecto, participantesProyecto]
  // );

  // const ParticipantBalance = useMemo(
  //   () => (
  //     <div className="flex flex-col gap-4 border border-1 bg-white p-5 rounded-xl shadow-md">
  //       <h2 className="text-2xl text-left font-bold">Balances</h2>
  //       <div className="flex flex-col gap-2">
  //         {participantesProyecto.map((participante) => {
  //           const { texto, color } = calcularGastoParticipante(
  //             participante.user_id
  //           );
  //           return (
  //             <div
  //               key={participante.user_id}
  //               className="flex flex-row bg-white p-5 rounded-xl shadow-md"
  //             >
  //               <span className="text-lg lg:text-2xl font-semibold">
  //                 {getParticipanteNombreApellido(participante.user_id)}
  //               </span>
  //               <span
  //                 className={`text-lg lg:text-2xl font-bold ml-auto ${color}`}
  //               >
  //                 {texto}
  //               </span>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   ),
  //   [
  //     participantesProyecto,
  //     calcularGastoParticipante,
  //     getParticipanteNombreApellido,
  //   ]
  // );

  return (
    <div className="flex flex-col w-full lg:px-[20vw] lg:py-[5vw] px-[5vw] py-[5vw] gap-8">
      {editandoProyectoMode ? (
        <ProjectEditToolbar
          onSaveProject={handleSaveProject}
          onCancelEdit={() => setEditandoProyectoMode(false)}
          onDeleteProject={handleDeleteProject}
        />
      ) : (
        <EditProjectButton onEditClick={handleEditProjectClick} />
      )}

      <ProjectTitle
        project={project}
        editMode={editandoProyectoMode}
        onChangeProjectStatus={handleChangeProjectStatus}
        onEditTitle={(title) => setProject((prev) => ({ ...prev, title }))}
        onEditDescription={(description) =>
          setProject((prev) => ({ ...prev, description }))
        }
      />

      <div className="flex flex-col lg:flex-row gap-4">
        <ProjectTotalAmount project={proyecto} />
        <ProjectParticipants
          projectParticipants={participants}
          editMode={editandoProyectoMode}
          onDeleteParticipant={handleDeleteParticipant}
          openNewParticipanteModal={openParticipanteModal}
        />
      </div>

      <div className="flex flex-col gap-4">
        <ProjectExpenses
          expenses={expenses}
          participantesProyecto={participantesProyecto}
          editMode={editandoProyectoMode}
          openGastoModal={openGastoModal}
        />
      </div>

      {/* {ParticipantBalance} */}
      {editandoProyectoMode && (
        <>
          {
            <NewParticipantModal
              projectId={project.project_id}
              projectParticipants={participants}
              isOpen={modalParticipanteIsOpen}
              onClose={closeParticipanteModal}
              onAddParticipant={(email) => handleAddParticipant(email)}
            />
          }
          {
            <NewGastoModal
              projectId={project.project_id}
              gastos={expenses}
              isOpen={modalGastoIsOpen}
              onClose={closeGastoModal}
              onAddGasto={handleAddGasto}
            />
          }
          {/* {
            <NewTicketModal
              isOpen={modalTicketIsOpen}
              onClose={closeTicketModal}
              onAddTicket={handleAddTicket}
              participantes={participants}
            />
          } */}
        </>
      )}
    </div>
  );
};
