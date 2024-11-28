import React, { useEffect, useState } from "react";
import {
  agregarParticipanteAlProyecto,
  fetchUsersByProjectId,
} from "../../services/ProjectService";

const NewParticipantModal = ({
  projectId,
  projectParticipants,
  isOpen,
  onClose,
  onAddParticipant,
}) => {
  const [newParticipantEmail, setNewParticipantEmail] = useState("");
  const [participantAlreadyInProject, setParticipantAlreadyInProject] =
    useState(false);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setNewParticipantEmail(email);
    if (email && projectParticipants.some((p) => p.email === email)) {
      setParticipantAlreadyInProject(true);
    } else {
      setParticipantAlreadyInProject(false);
    }
  };

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    if (newParticipantEmail && !participantAlreadyInProject) {
      onAddParticipant(newParticipantEmail);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[30vw]">
        <h2 className="text-2xl font-semibold mb-4">Agregar participante</h2>
        <form onSubmit={handleAddParticipant} className="flex flex-col gap-4">
          <input
            type="email"
            value={newParticipantEmail}
            onChange={handleEmailChange}
            className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
            placeholder="Ingrese el correo electrónico..."
          />
          {participantAlreadyInProject && (
            <p className="text-red-500 text-sm">
              Error. El participante ya está agregado al proyecto.
            </p>
          )}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:opacity-80"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={participantAlreadyInProject || !newParticipantEmail}
              className={`${
                participantAlreadyInProject ? "bg-gray-600" : "bg-brandblue"
              } text-white px-4 py-2 rounded-md hover:opacity-85`}
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewParticipantModal;
