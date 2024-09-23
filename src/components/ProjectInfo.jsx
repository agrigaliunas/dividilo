import React, { useState, useEffect } from "react";
import { EditIcon } from "./icons/EditIcon";
import { PaperAirplane } from "./icons/PaperAirplane";

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
    if(usuarios ) {
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
    <div className="bg-white w-[80vw] p-4 rounded-xl flex flex-col gap-5">
      <div className="flex flex-col gap-3 justify-center">
        {editandoProyecto ? (
          <>
            <div className="flex flex-row gap-2 items-center justify-center p-1">
              <input
                onChange={handleEditNombre}
                className="text-4xl font-semibold bg-white text-center border-b-2"
                value={projectData.nombre}
                placeholder="Nombre del proyecto"
              />
            </div>
            <div className="text-lg flex flex-row gap-1">
              <span className="font-semibold">Descripción:</span>
              <input
                className="text-lg border-b-2 w-full"
                onChange={handleEditDescripcion}
                value={projectData.descripcion}
                placeholder="Descripción del proyecto"
              />
            </div>
            <div className="text-lg flex flex-row gap-1">
              <span className="font-semibold">Monto total: </span>
              <input
                className="border-b-2"
                onChange={handleEditMontoTotal}
                value={projectData.montoTotal}
                placeholder="Monto total"
              />
            </div>
          </>
        ) : (
          <>
            <span className="text-4xl font-semibold text-center">{projectData.nombre}</span>
            <div className="flex flex-row gap-1">
              <span className="text-lg font-semibold">Descripción: </span>
              <span className="text-lg">{projectData.descripcion}</span>
            </div>
            <div className="flex flex-row gap-1">
              <span className="text-lg font-semibold">Monto total: </span>
              <span className="text-lg">${projectData.montoTotal}</span>
            </div>
            <div className="flex flex-row gap-1">
              <span className="text-lg font-semibold">Participantes: </span>
              <ul>
                {projectData.participantes.length > 0 ? (
                  projectData.participantes.map((participanteId, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span>• {getParticipanteInfo(participanteId)}</span> {/* Renderizamos nombre y apellido */}
                    </li>
                  ))
                ) : (
                  <span>No hay participantes.</span>
                )}
              </ul>
            </div>
          </>
        )}
        <button
          onClick={editandoProyecto ? handleSaveProyecto : handleEditarClick}
          className={`rounded-md p-1 ${editandoProyecto ? "bg-green-200" : "bg-gray-200"} hover:opacity-80 flex items-center justify-center gap-2`}
        >
          <span className="text-xs">
            {editandoProyecto ? "Guardar" : "Editar"}
          </span>
          {editandoProyecto ? <PaperAirplane /> : <EditIcon />}
        </button>
      </div>
    </div>
  );
};
