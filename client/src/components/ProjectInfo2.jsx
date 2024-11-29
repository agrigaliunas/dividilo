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
import { updateExpense } from "../services/ExpenseService";
import { eliminarSplitsDelParticipante } from "../services/SplitService";
import { updateTicket } from "../services/TicketService";

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

  const [selectedExpenseNewTicket, setSelectedExpenseNewTicket] =
    useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChangeProjectStatus = (newStatus) => {
    setProject((prevProject) => ({ ...prevProject, state: newStatus }));
    onProjectUpdate({ ...project, state: newStatus });
  };

  const handleSaveProject = async () => {
    try {
      await updateProject(
        project.project_id,
        project.title,
        project.description,
        project.state,
        user.token
      );
  
      const updatedTicketsPromises = expenses.flatMap((expense) =>
        expense.tickets?.map((ticket) =>
          updateTicket(
            ticket.ticket_id,
            ticket.description,
            ticket.amount,
            ticket.date,
            user.token
          )
        )
      );
  
      const updatedExpensesPromises = expenses.map((expense) =>
        updateExpense(expense.expense_id, expense.title, user.token)
      );
  
      await Promise.all([...updatedTicketsPromises, ...updatedExpensesPromises]);
  
      // Actualizar el estado local
      setExpenses(expenses);
      setProject(project);
      onProjectUpdate(project);
  
      setEditandoProyectoMode(false);
  
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar el proyecto o los gastos:", error);
      alert(
        "No se pudo guardar el proyecto o los gastos. Por favor, inténtalo de nuevo."
      );
    }
  };
  

  const handleDeleteProject = async () => {
    const response = await deleteProject(project.project_id, user.token);

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

  const openTicketModal = (selectedExpense) => {
    setSelectedExpenseNewTicket(selectedExpense);
    setModalTicketIsOpen(true);
  };

  const closeTicketModal = () => {
    setModalTicketIsOpen(false);
  };

  const handleAddParticipant = async (email) => {
    try {
      const response = await agregarParticipanteAlProyecto(
        user.user_id,
        project.project_id,
        email,
        user.token
      );

      const participant = await fetchUsuarioByEmail(email, user.token);

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
      user.user_id,
      project.project_id,
      userId,
      user.token
    );
    if (response.status === 200) {
      setParticipants((prevData) =>
        prevData.filter((p) => p.user_id !== userId)
      );
      onParticipantsUpdate(participants);
      await eliminarSplitsDelParticipante(
        userId,
        project.project_id,
        user.token
      );
    }
  };

  const handleAddGasto = (newExpense) => {
    setExpenses((prevData) => ({
      ...prevData,
      newExpense,
    }));
  };

  const handleEditExpenseTitle = (index, newTitle) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses];
      updatedExpenses[index] = { ...updatedExpenses[index], title: newTitle };
      return updatedExpenses;
    });
  };

  const handleEditTicket = async (ticketId, description, date, amount) => {

    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        const updatedTickets = expense.tickets.map((ticket) => {
          if (ticket.ticket_id === ticketId) {
            return {
              ...ticket,
              description,
              date,
              amount,
            };
          }
          return ticket;
        });

        return {
          ...expense,
          tickets: updatedTickets,
        };
      });
    });
  };

  const calcularGastoParticipante = useCallback(
    (participanteId) => {
      let totalGasto = 0;
      let splits = [];

      for (const expense of expenses) {
        for (const ticket of expense.tickets) {
          const split = ticket.splits.find((s) => s.user_id === participanteId);
          if (split) {
            totalGasto += split.user_amount;
            splits.push(split);
          } else {
            totalGasto = 0;
          }

          if (ticket.user_id === participanteId) {
            totalGasto += ticket.amount;
          }
        }
      }

      var balance = 0;

      if (totalGasto !== 0) {
        balance = project.total_amount / participants.length - totalGasto;
      }

      return {
        texto:
          balance < 0
            ? `+ $${Math.abs(balance).toFixed(2)}`
            : balance === 0
            ? `$0.00`
            : `- $${Math.abs(balance).toFixed(2)}`,
        color:
          balance < 0
            ? "text-green-500"
            : balance === 0
            ? "text-gray-500"
            : "text-red-500",
      };
    },
    [expenses, project, participants]
  );

  const ParticipantBalance = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl text-left font-bold border border-1 bg-white p-5 rounded-xl shadow-md">
          Balances
        </h2>
        <div className={`flex flex-col gap-2`}>
          {participants.map((participante) => {
            const { texto, color } = calcularGastoParticipante(
              participante.user_id
            );
            return (
              <div
                key={participante.user_id}
                className="flex flex-row bg-white p-5 rounded-xl shadow-md"
              >
                <div className="flex flex-col">
                  <span className="text-lg lg:text-xl font-medium">
                    {participante.name + " " + participante.lastname}
                  </span>
                  {!participante.finished_onboarding && (
                    <span className="text-gray-500 ml-1">
                      {participante.email}
                    </span>
                  )}
                </div>
                <span
                  className={`text-lg lg:text-2xl font-bold ml-auto ${color}`}
                >
                  {texto}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    ),
    [participants, calcularGastoParticipante]
  );

  return (
    <div className="flex flex-col w-full lg:px-[20vw] lg:py-[5vw] px-[5vw] py-[5vw] gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-extrabold">Información del proyecto</h2>
        <span className="text-gray-500 text-lg">
          Acá vas a poder ver los participantes del proyecto, el monto total
          gastado, y el monto por cada gasto adjunto a cada ticket subido.
        </span>
      </div>
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
          participantesProyecto={participants}
          onEditExpenseTitle={handleEditExpenseTitle}
          onEditTicket={handleEditTicket}
          editMode={editandoProyectoMode}
          openGastoModal={openGastoModal}
          handleOpenAddTicketModal={openTicketModal}
        />
      </div>

      <NewGastoModal
        projectId={project.project_id}
        gastos={expenses}
        isOpen={modalGastoIsOpen}
        onClose={closeGastoModal}
        onAddGasto={handleAddGasto}
      />
      <NewParticipantModal
        projectParticipants={participants}
        isOpen={modalParticipanteIsOpen}
        onClose={closeParticipanteModal}
        onAddParticipant={(email) => handleAddParticipant(email)}
      />
      <NewTicketModal
        expenseId={selectedExpenseNewTicket?.expense_id}
        isOpen={modalTicketIsOpen}
        onClose={closeTicketModal}
      />
      {ParticipantBalance}
    </div>
  );
};
