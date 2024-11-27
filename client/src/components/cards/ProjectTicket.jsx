import React from "react";

export const ProjectTicket = ({ ticket, index, participantes }) => {
  const getParticipanteNombreApellido = (participanteId) => {
    const usuario = participantes.find(
      (user) => user.user_id === participanteId
    );
    return usuario && usuario.initials;
  };

  return (
    <div
      key={index}
      className="flex flex-col gap-2 bg-gray-100 border-2 rounded-lg w-full text-base px-5 py-2 justify-center"
    >
      <div className="flex flex-row gap-4">
        <span className="font-extrabold text-xl">{ticket.description}</span>
        <span className="text-black text-sm ml-auto">{ticket.date}</span>
      </div>
      <div className="flex flex-col gap-1 w-full">
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
        <span className="font-bold text-lg ml-auto">
          Total ticket: ${ticket.amount}
        </span>
      </div>
      {/* {ticket.imagen && (
                    <button
                      onClick={() => setShowTicketImagen(!showTicketImagen)}
                      className="text-left underline text-xs hover:opacity-90 text-brandblue"
                    >
                      {showTicketImagen
                        ? "Esconder imagen del ticket"
                        : "Ver imagen del ticket"}
                    </button>
                  )}
                  {ticket.imagen && showTicketImagen && (
                    <img src={ticket.imagen} className="w-96 h-96" />
                  )} */}
    </div>
  );
};
