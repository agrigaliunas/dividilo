import React, { useState } from "react";
import { Trash } from "../icons/Trash";
import { deleteTicket } from "../../services/TicketService";

export const ProjectTicket = ({ editMode, ticket, index, participantes }) => {
  const [showTicketImagen, setShowTicketImagen] = useState(false);

  const getParticipanteNombreApellido = (participanteId) => {
    const usuario = participantes.find(
      (user) => user.user_id === participanteId
    );
    return usuario && usuario.initials;
  };

  const handleDeleteTicket = async () => {
    await deleteTicket(ticket.ticket_id)
    window.location.reload()
  }

  return (
    <div
      key={index}
      className="flex flex-col gap-2 rounded-lg w-full text-base px-5 py-2 justify-center"
    >
      <div className="flex flex-col">
        <span className="text-gray-400 text-md">
          {ticket.ticket_date.substring(0, 10)}
        </span>
        <div className="flex flex-row justify-between mt-1">
          <div className="flex flex-row gap-1 items-center">
            {editMode && (
              <button onClick={handleDeleteTicket}>
                <Trash style="w-6 h-6" />
              </button>
            )}
            <span className="text-xl">{ticket.description}</span>
          </div>
          <span className="font-bold text-xl">${ticket.amount}</span>
        </div>
      </div>
      {ticket.image && (
        <button
          onClick={() => setShowTicketImagen(!showTicketImagen)}
          className="bg-green-200 text-green-900 upper rounded-md py-1 hover:opacity-80 px-4 flex justify-center"
        >
          {showTicketImagen
            ? "Esconder imagen del ticket"
            : "Ver imagen del ticket"}
        </button>
      )}
      {ticket.image && showTicketImagen && (
        <img src={ticket.image} className="w-100 h-100 " />
      )}
      {/* <div className="flex flex-col gap-1 w-full"> */}
      {/* {ticket.split?.length > 0 &&
          ticket.split.map((sp, spIndex) => (
            <div
              key={spIndex}
              className="flex flex-row gap-2 w-full justify-between items-center"
            >
              <span className="font-semibold w-72">
                {getParticipanteNombreApellido(sp.participanteId)}
              </span>
              <div className="space-x-1">
                <div className="space-x-1">
                  <span className="font-semibold">
                    Gastó ${sp.montoParticipante.toFixed(2)}
                  </span>
                  <span className="text-red-500">({sp.porcentaje}%)</span>
                </div>
              </div>
            </div>
          ))} */}
      {/* </div> */}
    </div>
  );
};
