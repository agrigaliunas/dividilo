import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getExpensesWithTicketsByProjectId } from "../services/ExpenseService";
import { ProjectTitle } from "./cards/ProjectTitle";
import { EditProjectButton } from "./buttons/EditProjectButton";
import { ProjectTotalAmount } from "./cards/ProjectTotalAmount";
import { ProjectParticipants } from "./cards/ProjectParticipants";
import { ProjectExpenses } from "./cards/ProjectExpenses";

export const ProjectInfo2 = ({ proyecto, participantesProyecto }) => {
  const [gastos, setGastos] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();


  const getParticipanteNombreApellido = (participanteId) => {
    const usuario = participantesProyecto.find(
      (user) => user.user_id === participanteId
    );
    return usuario && usuario.initials;
  };

  useEffect(() => {
    const actualizarProyecto = async () => {
      if (proyecto) {
        const gastos = await getExpensesWithTicketsByProjectId(
          proyecto.project_id,
          user.token
        );
        setGastos(gastos);
      }
    };

    actualizarProyecto();
  }, [proyecto, user.token, participantesProyecto]);


  // const calcularGastoParticipante = (proyecto, participanteId) => {
  //   let totalGasto = 0;

  //   gastos.forEach((gasto) => {
  //     gasto.tickets.forEach((ticket) => {
  //       const splitParticipante = ticket.split.find(
  //         (split) => split.participanteId === participanteId
  //       );
  //       if (splitParticipante) {
  //         totalGasto +=
  //           (ticket.montoTotalTicket * splitParticipante.porcentaje) / 100;
  //       }
  //     });
  //   });

  //   const balance =
  //     proyecto.montoTotalProyecto / proyecto.participantes.length - totalGasto;

  //   if (balance < 0) {
  //     return {
  //       texto: `+ $${(balance * -1)}`,
  //       color: "text-green-500",
  //     };
  //   } else if (balance === 0) {
  //     return {
  //       texto: `$${(balance)}`,
  //       color: "text-gray-500",
  //     };
  //   }
    
  //   else {
  //     return { texto: `- $${balance}`, color: "text-red-500" };
  //   }
  // };

  return (
    <div className="flex flex-col w-full lg:px-[20vw] lg:py-[5vw] px-[5vw] py-[5vw] gap-8">
      {/* <EditProjectButton onEditClick={handleEditProjectClick} /> */}
      <EditProjectButton />

      <ProjectTitle project={proyecto} />

      <div className="flex flex-col lg:flex-row gap-4">
        <ProjectTotalAmount project={proyecto} />
        <ProjectParticipants participants={participantesProyecto} />
      </div>
      <div className="flex flex-col gap-4">
        <ProjectExpenses
          project={proyecto}
          expenses={gastos}
          participantesProyecto={participantesProyecto}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 border border-1 bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-2xl text-left font-bold">Balances</h2>
          <div className="flex flex-col gap-2">
            {/* {participantesProyecto.map((participante, participanteIndex) => {
              const { texto, color } = calcularGastoParticipante(
                proyecto,
                participante
              );
              return (
                <div
                  key={participanteIndex}
                  className="flex flex-row bg-white p-5 rounded-xl shadow-md"
                >
                  <span className="text-lg lg:text-2xl font-semibold">
                    {getParticipanteNombreApellido(participante)}
                  </span>
                  <span
                    className={`text-lg lg:text-2xl font-bold ml-auto ${color}`}
                  >
                    {texto}
                  </span>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
};
