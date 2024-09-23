import React, { useState, useEffect } from "react";
import { EditIcon } from "./icons/EditIcon";
import { PaperAirplane } from "./icons/PaperAirplane";
import { Trash } from "./icons/Trash";
import { UserPlus } from "./icons/UserPlus";

export const ProjectInfo = ({ project, usuarios }) => {
  const [projectData, setProjectData] = useState({
    nombre: "",
    descripcion: "",
    montoTotal: "",
    fecha: "",
    participantes: []
  });

  const [editandoProyecto, setEditandoProyecto] = useState(false);

  useEffect(() => {
    if (project) {
      setProjectData({
        nombre: project.nombre,
        descripcion: project.descripcion,
        montoTotal: project.montoTotal,
        participantes: project.participantes || [] // Aseguramos que sea un arreglo
      });
    }
  }, [project]);

  // Mapeo de participantes con sus nombres y apellidos de usuarios
  const getParticipanteInfo = (participanteId) => {
    if (usuarios) {
      const usuario = usuarios.find(user => user.id === participanteId);
      return usuario && `${usuario.nombre} ${usuario.apellido}`
    }
    return "Desconocido";
  };

  // Actualiza el nombre del proyecto en el estado
  const handleEditNombre = (e) => {
    setProjectData({ ...projectData, nombre: e.target.value });
  };

  // Actualiza la descripción del proyecto en el estado
  const handleEditDescripcion = (e) => {
    setProjectData({ ...projectData, descripcion: e.target.value });
  };

  // Actualiza el monto total del proyecto en el estado
  const handleEditMontoTotal = (e) => {
    setProjectData({ ...projectData, montoTotal: e.target.value });
  };

  const handleEditarClick = () => {
    setEditandoProyecto(!editandoProyecto); // Alterna entre editar y no editar
  };

  const handleSaveProyecto = () => {
    // Aquí iría la lógica para guardar los cambios, como una llamada a una API
    console.log("Datos del proyecto guardados", projectData);
    setEditandoProyecto(false); // Finaliza el modo de edición
  };

  return (
    <div>

      
    </div>
  );
};
