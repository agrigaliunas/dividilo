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
    participantes: [],
    gastos: []
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

  const getGastosInfo = (g) => {
    if (project.gastos) {
      return project.gasto && `${project.gasto.descripcion}`
    }
    return "Desconocido";
  };

  const getIniciales = (participanteId) => {
    if (usuarios) {
      const usuario = usuarios.find(user => user.id === participanteId);
      if (usuario) {
        const inicialNombre = usuario.nombre.charAt(0).toUpperCase();
        const inicialApellido = usuario.apellido.charAt(0).toUpperCase();
        return `${inicialNombre}${inicialApellido}`;
      }
    }
    return "??";
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
    <div className="flex flex-col w-full lg:px-[20vw] lg:py-[5vw] h-svh px-[5vw] py-[5vw] gap-10">

      <button className="flex flex-row bg-brandblue rounded-xl border border-1 w-fit p-3 gap-2">
        <span className="text-white">Editar proyecto</span>
        <span className="text-white "><EditIcon /></span>
      </button>

      <div className="flex flex-col gap-5 border border-1 bg-white p-5 rounded-xl shadow-md">
        <h1 className="text-4xl text-left font-semibold">{project.nombre}</h1>
        <span>{project.descripcion}</span>
      </div>

      <div className="flex flex-row gap-4">

        <div className="flex flex-col border border-1 bg-white rounded-xl shadow-md p-5 w-[50%]">
          <h1 className="text-2xl text-left font-semibold">Monto total</h1>
          <div className="flex-grow"></div>
          <span className="text-4xl font-bold mt-4">$ {project.montoTotal}</span>
        </div>


        <div className="border border-1 bg-white rounded-xl shadow-md p-5 w-[50%]">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl text-left font-semibold">Participantes</h1>
            <span className="text-4xl font-bold">{project.participantes?.length}</span>
            <div className="flex flex-row gap-4">
              {project.participantes?.length > 0 ? (
                project.participantes.map((p, index) => (
                  <span className="rounded-full border border-1 border-gray-400 bg-brandblue text-white font-semibold p-2">{getIniciales(p)}</span>
                ))
              ) : (
                <span>No hay participantes</span>
              )}
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-5 border border-1 bg-white p-5 rounded-xl shadow-md">
        <h1 className="text-4xl text-left font-semibold">Gastos de los participantes</h1>
        <div className="flex flex-col gap-4">
          {project.participantes?.length > 0 ? (
            project.participantes.map((p, index) => (
              <span className="">{getParticipanteInfo(p)}</span>
            ))
          ) : (
            <span>No hay participantes</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 border border-1 bg-white p-5 rounded-xl shadow-md">
        <h1 className="text-4xl text-left font-semibold">Gastos</h1>
        <div className="flex flex-col gap-4">
          {project.gastos?.length > 0 ? (
            project.gastos.map((gasto, index) => (
              <div className="flex flex-row justify-items-stretch">
                <span className="font-semibold">{gasto.descripcion}</span>
                <span className="ml-auto">${gasto.monto}</span>
              </div>

            ))
          ) : (
            <span>No hay gastos</span>
          )}
        </div>
      </div>
    </div>
  );
};
