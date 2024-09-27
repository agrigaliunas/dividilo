import React, { useEffect, useState } from "react";
import { fetchUsuarios } from "../services/UserService";

export const ProjectParticipantRounded = ({ participant }) => {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios().then(setUsuarios);
  }, []);

  const getInicialesParticipante = (participanteId) => {
    if (usuarios) {
      const usuario = usuarios.find((user) => user.id === participanteId);
      if (usuario) {
        const inicialNombre = usuario.nombre.charAt(0).toUpperCase();
        const inicialApellido = usuario.apellido.charAt(0).toUpperCase();
        return `${inicialNombre}${inicialApellido}`;
      }
    }
    return "??";
  };

  return (
    <div className={`rounded-full w-12 h-12 flex items-center justify-center border border-1 border-gray-400 bg-brandblue text-white font-semibold p-2`}>
      <span>{getInicialesParticipante(participant)}</span>
    </div>
  );
};
