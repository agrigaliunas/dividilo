import React, { useState } from "react";
import { Trash } from "../icons/Trash";
import {
  deleteTicket,
  deleteTicketImage,
  uploadTicketImage,
} from "../../services/TicketService";
import { DocumentMinus } from "../icons/DocumentMinus";
import { Eye } from "../icons/Eye";
import { EyeSlash } from "../icons/EyeSlash";
import { DocumentPlus } from "../icons/DocumentPlus";
import { useAuth } from "../../contexts/AuthContext";
import { addSplit, deleteSplit } from "../../services/SplitService";

export const ProjectTicket = ({
  editMode,
  ticket,
  index,
  participantes,
  editTicket,
}) => {
  const ticketDateObject = new Date(ticket.ticket_date);
  const formattedDate = ticketDateObject.toISOString().split("T")[0];

  const [showTicketImagen, setShowTicketImagen] = useState(false);
  const [ticketDescription, setTicketDescription] = useState(
    ticket.description
  );
  const [ticketDate, setTicketDate] = useState(formattedDate);
  const [ticketAmount, setTicketAmount] = useState(ticket.amount);

  const [showModal, setShowModal] = useState(false);
  const [newSplit, setNewSplit] = useState({
    user_id: "",
    user_percentage: "",
    user_amount: "",
  });

  const [selectedSplitType, setSelectedSplitType] = useState("Monto");

  const { user } = useAuth();

  const getParticipanteNombreApellido = (participanteId) => {
    const usuario = participantes.find(
      (user) => user.user_id === participanteId
    );
    return usuario && usuario.name + " " + usuario.lastname;
  };

  const getParticipanteEmail = (participanteId) => {
    const usuario = participantes.find(
      (user) => user.user_id === participanteId
    );
    return usuario && usuario.email;
  };

  const participanteFinalizoOnboarding = (participanteId) => {
    const usuario = participantes.find(
      (user) => user.user_id === participanteId
    );
    return usuario && usuario.finished_onboarding;
  };

  const handleDeleteTicket = async () => {
    await deleteTicket(ticket.ticket_id, user.token);
    window.location.reload();
  };

  const addImage = async () => {
    {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        await uploadTicketImage(ticket.ticket_id, formData, user.token);
        setShowTicketImagen(true);
        window.location.reload(true);
      };
      fileInput.click();
    }
  };

  const deleteImage = async () => {
    await deleteTicketImage(ticket.ticket_id, user.token);
    window.location.reload(true);
  };

  const onEditTicketDescription = (newDescription) => {
    setTicketDescription(newDescription);
    editTicket(ticket.ticket_id, ticketDescription, ticketDate, ticketAmount);
  };

  const onEditTicketDate = (newDate) => {
    setTicketDate(newDate);
    editTicket(ticket.ticket_id, ticketDescription, ticketDate, ticketAmount);
  };

  const onEditTicketAmount = (newAmount) => {
    if (newAmount === "") {
      setTicketAmount("");
      return;
    }

    const parsedAmount = parseFloat(newAmount);
    if (!isNaN(parsedAmount)) {
      setTicketAmount(parsedAmount);
      editTicket(ticket.ticket_id, ticketDescription, ticketDate, parsedAmount);
    }
  };

  const handleAddSplit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSplitTypeChange = (type) => {
    setSelectedSplitType(type);
  };

  const handleSaveSplit = async () => {
    await addSplit(newSplit, ticket.ticket_id, selectedSplitType, user.token);
    setShowModal(false);
    window.location.reload(true);
  };

  const handleDeleteSplit = async (splitId) => {
    console.log(splitId)
    await deleteSplit(splitId, user.token);
    window.location.reload(true);
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
                  onClick={() => addImage()}
                  className="bg-green-200 upper rounded-md py-1 hover:opacity-80 px-4 flex text-green-800 w-fit"
                >
                  <DocumentPlus style="w-6 h-6" /> Agregar imagen del ticket
                </button>
              ) : (
                <button
                  onClick={() => deleteImage()}
                  className="bg-orange-200 upper rounded-md py-1 hover:opacity-80 px-4 flex text-orange-800 w-fit"
                >
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
              value={ticketDate}
              onChange={(e) => onEditTicketDate(e.target.value)}
              className="text-gray-400 text-md w-fit my-2"
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
                  value={ticketDescription}
                  onChange={(e) => onEditTicketDescription(e.target.value)}
                  placeholder="Ingrese descripcion del ticket..."
                />
              </>
            ) : (
              <span className="text-xl">{ticket.description}</span>
            )}
          </div>
          {editMode ? (
            <input
              type="text"
              className="font-bold text-center text-xl lg:text-2xl rounded-lg border-b border-black bg-transparent border-dashed border-spacing-3"
              value={
                ticketAmount !== "" ? parseFloat(ticketAmount).toFixed(2) : ""
              }
              onChange={(e) => onEditTicketAmount(e.target.value)}
              placeholder="Ingrese monto del ticket..."
            />
          ) : (
            <span className="font-bold text-xl">Total ${ticket.amount}</span>
          )}
        </div>
      </div>
      {ticket.splits?.length > 0 ? (
        <span className="text-gray-500 my-2">
          El total se divide de la siguiente manera:
        </span>
      ) : (
        <>
          <span className="text-gray-500 mt-3">
            No hay splits asociados aún.
          </span>
        </>
      )}

      <div className="flex flex-col gap-1 w-full px-16">
        {ticket.splits?.length > 0 &&
          ticket.splits.map((sp, spIndex) => {
            const percentage = parseFloat(sp.user_percentage) * 100;
            const splitId = sp.split_id
            return (
              <div
                key={spIndex}
                className="flex items-center gap-4 w-full my-2"
              >
                {editMode && (
                  <button onClick={() => handleDeleteSplit(splitId)}>
                    <Trash style="w-6 h-6" />
                  </button>
                )}
                <div className="flex flex-col">
                  <span className="font-semibold w-48 text-left">
                    {getParticipanteNombreApellido(sp.user_id)}
                  </span>
                  {!participanteFinalizoOnboarding(sp.user_id) && (
                    <span className="text-gray-500">
                      {getParticipanteEmail(sp.user_id)}
                    </span>
                  )}
                </div>

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
      <button
        onClick={handleAddSplit}
        className="bg-green-200 upper rounded-md py-1 hover:opacity-80 px-4 flex text-green-800 w-fit"
      >
        <DocumentPlus style="w-6 h-6" /> Agregar split
      </button>
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4">Agregar un nuevo split</h2>

            <div className="flex mb-4">
              <div
                onClick={() => handleSplitTypeChange("Monto")}
                className={`w-1/2 text-center py-2 cursor-pointer ${
                  selectedSplitType === "Monto"
                    ? "bg-brandblue text-white"
                    : "bg-gray-200"
                }`}
              >
                Monto
              </div>
              <div
                onClick={() => handleSplitTypeChange("Porcentaje")}
                className={`w-1/2 text-center py-2 cursor-pointer ${
                  selectedSplitType === "Porcentaje"
                    ? "bg-brandblue text-white"
                    : "bg-gray-200"
                }`}
              >
                Porcentaje
              </div>
            </div>

            <div className="mb-4">
              <select
                value={newSplit.user_id}
                onChange={(e) =>
                  setNewSplit({ ...newSplit, user_id: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccione un participante</option>
                {participantes
                  .filter((participante) => {
                    return !ticket.splits.some(
                      (split) => split.user_id === participante.user_id
                    );
                  })
                  .map((participante) => (
                    <option
                      key={participante.user_id}
                      value={participante.user_id}
                    >
                      {participante.finished_onboarding
                        ? `${participante.name} ${participante.lastname}`
                        : participante.email}
                    </option>
                  ))}
              </select>
            </div>

            {selectedSplitType === "Monto" ? (
              <div className="mb-4">
                <input
                  type="number"
                  value={parseFloat(newSplit.user_amount).toFixed(2)}
                  onChange={(e) =>
                    setNewSplit({ ...newSplit, user_amount: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Monto a asignar"
                />
              </div>
            ) : (
              <div className="mb-4">
                <input
                  type="number"
                  value={parseFloat(newSplit.user_percentage).toFixed(2)}
                  onChange={(e) =>
                    setNewSplit({
                      ...newSplit,
                      user_percentage: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Porcentaje del split"
                />
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:opacity-80"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveSplit}
                className="bg-brandblue text-white px-4 py-2 rounded-md hover:opacity-85"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {ticket.image && showTicketImagen && (
        <img src={ticket.image} className="w-100 h-100 " />
      )}
    </div>
  );
};
