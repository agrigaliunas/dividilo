import React, { useEffect, useState } from "react";
import { checkEmailExists } from "../../services/AuthService";

const NewParticipantModal = ({ participantesId, isOpen, onClose, onAddParticipant }) => {
  
  const [participanteNoExiste, setParticipanteNoExiste] = useState(true);
  const [participanteAgregando, setParticipanteAgregando] = useState("");
  const [participanteYaAgregado, setParticipanteYaAgregado] = useState(false);
  const [usuariosId, setUsuariosId] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    // if (loggedUser && loggedUser.email && !participantesId.includes(loggedUser.email)) {
      setUsuariosId(participantesId.filter(p => participantesId.includes(p)));
    // }
  }, []);

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setParticipanteAgregando(email);
    
    if (email) {
      const userExists = await checkEmailExiste(email);
      const alreadyAdded = await checkParticipanteYaAgregado(email);
      setParticipanteNoExiste(!userExists);
      setParticipanteYaAgregado(alreadyAdded);
    } else {
      setParticipanteNoExiste(true);
      setParticipanteYaAgregado(false);
    }
  };

  const checkEmailExiste = async (email) => {
    const usuario = await checkEmailExists(email);

    if (usuario) {
      if (!usuariosId.includes(usuario.id)) {
        console.log(usuariosId)
        const newUsers = usuariosId.push(usuario.id)
        setUsuariosId(newUsers);
        console.log(usuariosId)
      }
      return true;
    }
    return false;
  };

  const checkParticipanteYaAgregado = async (email) => {
    const usuario = await checkEmailExists(email);

    if (usuario) {
      return participantesId.includes(usuario.id);
    }
    return false;
  };

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    if (participanteAgregando && !participanteYaAgregado) {
      onAddParticipant(usuariosId);
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
            value={participanteAgregando}
            onChange={handleEmailChange}
            className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
            placeholder="Ingrese el correo electrónico..."
          />
          {participanteYaAgregado && (
            <p className="text-red-500 text-sm">El participante está en el proyecto.</p>
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
              disabled={participanteNoExiste || participanteYaAgregado}
              className={`${participanteNoExiste || participanteYaAgregado ? "bg-gray-600" : "bg-brandblue"} text-white px-4 py-2 rounded-md hover:opacity-85`}
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
