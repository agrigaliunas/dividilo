import React, { useEffect, useState } from "react";
import { agregarParticipanteAlProyecto, fetchUsersByProjectId } from "../../services/ProjectService";

const NewParticipantModal = ({ projectId, isOpen, onClose, onAddParticipant }) => {
  const [participanteAgregando, setParticipanteAgregando] = useState("");
  const [participanteYaAgregado, setParticipanteYaAgregado] = useState(false);
  const [usuariosProyecto, setUsuariosProyecto] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      if (isOpen) {
        const usuarios = await fetchUsersByProjectId(projectId);
        setUsuariosProyecto(usuarios);
      }
    };
    fetchUsuarios();
  }, [isOpen, projectId]);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setParticipanteAgregando(email);

    if (email) {
      const yaAgregado = usuariosProyecto.some((u) => u.email === email);
      setParticipanteYaAgregado(yaAgregado);
    } else {
      setParticipanteYaAgregado(false);
    }
  };

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    if (participanteAgregando && !participanteYaAgregado) {
      await agregarParticipanteAlProyecto(projectId, participanteAgregando);

      setUsuariosProyecto((prev) => [...prev, { participanteAgregando }]);

      onAddParticipant(participanteAgregando);
      setParticipanteAgregando("");

      setParticipanteAgregando("");
      onClose();    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[30vw]">
        <h2 className="text-2xl font-semibold mb-4">Agregar participante</h2>
        <form onSubmit={handleAddParticipant} className="flex flex-col gap-4">
          <input
            type="email"
            value={participanteAgregando}
            onChange={handleEmailChange}
            className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
            placeholder="Ingrese el correo electrónico..."
          />
          {participanteYaAgregado && (
            <p className="text-red-500 text-sm">El participante ya está agregado al proyecto.</p>
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
              disabled={participanteYaAgregado || !participanteAgregando}
              className={`${participanteYaAgregado ? "bg-gray-600" : "bg-brandblue"} text-white px-4 py-2 rounded-md hover:opacity-85`}
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
