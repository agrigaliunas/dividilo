import React, { useState } from "react";
import { Trash } from "../icons/Trash";
import { deleteTicket } from "../../services/TicketService";
import { DocumentMinus } from "../icons/DocumentMinus";
import { Eye } from "../icons/Eye";
import { EyeSlash } from "../icons/EyeSlash";
import { DocumentPlus } from "../icons/DocumentPlus";

export const ProjectTicket = ({ editMode, ticket, index, participantes }) => {
  const [showTicketImagen, setShowTicketImagen] = useState(false);

  const getParticipanteNombreApellido = (participanteId) => {
    const usuario = participantes.find(
      (user) => user.user_id === participanteId
    );
    return usuario && usuario.name + " " + usuario.lastname;
  };

  const handleDeleteTicket = async () => {
    await deleteTicket(ticket.ticket_id);
    window.location.reload();
  };

  return (
    <div
      key={index}
      className="flex flex-col gap-2 rounded-lg w-full text-base px-5 py-2 justify-center"
    >
      <div className="flex flex-col">
        {editMode ? (
          <>
            <div className="flex flex-row gap-2 ml-auto mb-7">
              {!ticket.image ? (
                <button
                  // onClick={() => setShowTicketImagen(!showTicketImagen)}
                  className="bg-green-200 upper rounded-md py-1 hover:opacity-80 px-4 flex text-green-800 w-fit"
                >
                  <DocumentPlus style="w-6 h-6" /> Agregar imagen del ticket
                </button>
              ) : (
                <button className="bg-red-200 upper rounded-md py-1 hover:opacity-80 px-4 flex text-red-800 w-fit">
                  <DocumentMinus style="w-6 h-6" /> Eliminar imagen del ticket
                </button>
              )}
              <button
                onClick={handleDeleteTicket}
                className="bg-red-200 upper rounded-md py-1 hover:opacity-80 px-4 flex text-red-800 w-fit"
              >
                <Trash style="w-6 h-6" /> Eliminar ticket
              </button>
            </div>
            <input
              type="date"
              value={ticket.ticket_date}
              // onChange={handleDateChange}
              className="text-gray-400 text-md w-fit my-2"
              placeholder={ticket.ticket_date}
            />
          </>
        ) : (
          <span className="text-gray-400 text-md">
            {ticket.ticket_date.substring(0, 10)}
          </span>
        )}

        <div className="flex flex-row justify-between mt-1">
          <div className="flex flex-row gap-1 items-center">
            {editMode ? (
              <>
                <input
                  type="text"
                  className="font-bold text-center text-xl rounded-lg border-b border-black bg-transparent border-dashed border-spacing-3"
                  value={ticket.description || ""}
                  // onChange={(e) => onEditTicketAmount(e.target.value)}
                  placeholder="Ingrese descripcion del ticket..."
                />
              </>
            ) : (
              <span className="text-xl">{ticket.description}</span>
            )}
          </div>
          {editMode ? (
            <input
              type="number"
              className="font-bold text-center text-xl lg:text-2xl rounded-lg border-b border-black bg-transparent border-dashed border-spacing-3"
              value={ticket.amount || ""}
              // onChange={(e) => onEditTicketAmount(e.target.value)}
              placeholder="Ingrese monto del ticket..."
            />
          ) : (
            <span className="font-bold text-xl">Total ${ticket.amount}</span>
          )}
        </div>
      </div>
      {ticket.splits?.length > 0 ? (
        <span className="text-gray-500 my-2">El total se divide de la siguiente manera:</span>
      ) : (
        <span className="text-gray-500 my-2">No hay splits asociados aún.</span>
        
      )}
      <div className="flex flex-col gap-1 w-full px-24">
        {ticket.splits?.length > 0 &&
          ticket.splits.map((sp, spIndex) => {
            const percentage = parseFloat(sp.user_percentage) * 100;
            return (
              <div key={spIndex} className="flex items-center gap-4 w-full my-2">
                <span className="font-semibold w-48 text-left">
                  {getParticipanteNombreApellido(sp.user_id)}
                </span>

                <div className="w-full h-4 bg-gray-200 rounded-full relative">
                  <div
                    className="h-full bg-brandblue rounded-full"
                    style={{
                      width: `${percentage}%`,
                      transition: "width 0.3s ease-in-out",
                    }}
                  />
                  <div
                    className="absolute top-[-12px] flex flex-col items-center"
                    style={{
                      left: `calc(${percentage}% - 10px)`,
                    }}
                  >
                    <span className="text-md font-bold text-brandblue absolute -top-3 left-1">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>

                <span className="font-bold text-brandblue text-md w-16 text-right">
                  Gastó ${sp.user_amount}
                </span>
              </div>
            );
          })}
      </div>
      {ticket.image && (
        <div className="flex flex-row gap-1 items-center mt-2">
          <button
            onClick={() => setShowTicketImagen(!showTicketImagen)}
            className="bg-gray-200 upper rounded-md py-1 hover:opacity-80 px-4 justify-center w-fit flex ml-auto"
          >
            {showTicketImagen ? (
              <>
                <EyeSlash />
                Esconder imagen del ticket
              </>
            ) : (
              <>
                <Eye />
                Ver imagen del ticket
              </>
            )}
          </button>
        </div>
      )}
      {ticket.image && showTicketImagen && (
        <img src={ticket.image} className="w-100 h-100 " />
      )}
      
    </div>
  );
};
