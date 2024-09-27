import React, { useState, useEffect } from "react";
import { EditIcon } from "./icons/EditIcon";
import { PaperAirplane } from "./icons/PaperAirplane";
import { Trash } from "./icons/Trash";
import { UserPlus } from "./icons/UserPlus";
import { ChevronDown } from "./icons/ChevronDown";
import NewParticipantModal from "./modals/NewParcitipantModal";
import { ArrowsUpDown } from "./icons/ArrowsUpDown";

export const ProjectInfo = ({ project, usuarios }) => {
  const [projectData, setProjectData] = useState({
    nombre: "",
    descripcion: "",
    montoTotalProyecto: "",
    estado: "",
    participantes: [],
    gastos: [],
  });

  const [editandoProyecto, setEditandoProyecto] = useState(false);
  const [gastosExpandidos, setGastosExpandidos] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showTicketImagen, setShowTicketImagen] = useState(false)

  useEffect(() => {
    if (project) {
      setProjectData({
        nombre: project.nombre,
        descripcion: project.descripcion,
        montoTotalProyecto: project.montoTotalProyecto,
        estado: project.estado,
        participantes: project.participantes || [],
        gastos: project.gastos || [],
      });
    }
  }, [project]);

  const toggleGasto = (index) => {
    setGastosExpandidos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getParticipanteNombreApellido = (participanteId) => {
    if (usuarios) {
      const usuario = usuarios.find((user) => user.id === participanteId);
      return usuario && `${usuario.nombre} ${usuario.apellido}`;
    }
    return "Desconocido";
  };

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

  const calcularGastoParticipante = (proyecto, participanteId) => {
    let totalGasto = 0;

    proyecto.gastos.forEach((gasto) => {
      gasto.tickets.forEach((ticket) => {
        const splitParticipante = ticket.split.find(
          (split) => split.participanteId === participanteId
        );
        if (splitParticipante) {
          totalGasto +=
            (ticket.montoTotalTicket * splitParticipante.porcentaje) / 100;
        }
      });
    });

    const balance =
      proyecto.montoTotalProyecto / proyecto.participantes.length - totalGasto;

    if (balance < 0) {
      return {
        texto: `+ $${(balance * -1).toFixed(2)}`,
        color: "text-green-500",
      };
    } else {
      return { texto: `- $${balance.toFixed(2)}`, color: "text-red-500" };
    }
  };

  const handleEditNombre = (e) => {
    setProjectData({ ...projectData, nombre: e.target.value });
  };

  const handleEditDescripcion = (e) => {
    setProjectData({ ...projectData, descripcion: e.target.value });
  };

  const handleEditarClick = () => {
    setEditandoProyecto(!editandoProyecto);
  };

  const handleSaveProyecto = () => {
    setEditandoProyecto(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddParticipant = (email) => {
    console.log("Nuevo participante agregado: ", email);
  };

  return (
    <div className="flex flex-col w-full lg:px-[20vw] lg:py-[5vw] px-[5vw] py-[5vw] gap-8">
      {editandoProyecto == false && (
        <>
          <button
            onClick={handleEditarClick}
            className="flex flex-row bg-brandblue rounded-xl border border-1 w-fit p-3 gap-2"
          >
            <span className="text-white">Editar proyecto</span>
            <span className="text-white ">
              <EditIcon />
            </span>
          </button>
          <div className="flex flex-col gap-3 border border-1 bg-white p-5 rounded-xl shadow-md">
            <div className="flex flex-row lg:justify-between gap-5">
              <h1 className="lg:text-4xl text-xl text-left font-extrabold">
                {projectData.nombre}
              </h1>
              {projectData.estado === "En progreso" ? (
                <span className="font-semibold flex items-center justify-center text-center lg:p-3 p-1.5 bg-orange-600 bg-opacity-40 rounded-xl text-gray-800 cursor-default select-none text-xs lg:text-sm">
                  En progreso
                </span>
              ) : (
                <span className="font-semibold flex items-center justify-center text-center lg:p-3 p-1.5 bg-green-600 bg-opacity-40 rounded-xl text-gray-800 cursor-default select-none text-xs lg:text-sm">
                  Finalizado
                </span>
              )}
            </div>
            <span className="text-gray-500 font-medium">
              {projectData.descripcion}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col w-full border border-1 bg-white rounded-xl shadow-md p-5 lg:w-[50%] gap-4">
              <h2 className="text-2xl text-left font-bold">
                Monto total gastado
              </h2>
              <span className="text-4xl font-bold mt-auto">
                $
                {projectData.montoTotalProyecto &&
                  projectData.montoTotalProyecto.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col w-full border border-1 bg-white rounded-xl shadow-md p-5 lg:w-[50%] gap-4">
              <h2 className="text-2xl text-left font-bold">Participantes</h2>
              <span className="text-4xl font-bold">
                {projectData.participantes.length || "1"}
              </span>
              <div className="flex flex-row gap-4">
                {projectData.participantes.length > 0 &&
                  projectData.participantes.map((p, index) => (
                    <span
                      key={index}
                      className="rounded-full w-12 h-12 flex items-center justify-center border border-1 border-gray-400 bg-brandblue text-white font-semibold p-2"
                    >
                      {getInicialesParticipante(p)}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 border border-1 bg-white p-5 rounded-xl shadow-md">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-2xl text-left font-bold">
                  Gastos del proyecto
                </h2>
                <button className="border-2 border-brandblue text-brandblue rounded-lg py-2 px-4 hover:opacity-80">
                  Agregar gasto
                </button>
              </div>
              <div className={`flex flex-col gap-2`}>
                {projectData.gastos.length > 0 ? (
                  projectData.gastos.map((gasto, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center border-2 rounded-xl gap-2 w-full"
                    >
                      <div className="flex flex-col gap-3 items-left bg-white p-5 rounded-xl shadow-md w-full">
                        <div className="flex flex-row gap-2 items-center">
                          <button
                            onClick={() => toggleGasto(index)}
                            className="bg-gray-200 rounded-full p-1 hover:opacity-80"
                          >
                            <ChevronDown />
                          </button>
                          <span className="font-semibold text-xl lg:text-2xl rounded-lg">
                            {gasto.descripcion}
                          </span>
                          <span className="font-bold text-xl lg:text-2xl rounded-lg ml-auto">
                            ${gasto.montoTotalGasto.toFixed(2)}
                          </span>
                        </div>
                        {gastosExpandidos[index] && (
                          <>
                            {gasto.tickets?.length > 0 &&
                              gasto.tickets.map((ticket, ticketIndex) => (
                                <div
                                  key={ticketIndex}
                                  className="flex flex-col gap-2 bg-gray-100 border-2 rounded-lg w-full text-base px-5 py-2 justify-center"
                                >
                                  <button className="w-fit border-2 text-gray-500 rounded-lg py-2 px-4 hover:opacity-80 text-xs">
                                    Editar ticket
                                  </button>
                                  <div className="flex flex-row gap-4">
                                    <span className="font-extrabold text-xl">
                                      {ticket.descripcion}
                                    </span>
                                    <span className="text-gray-500 bg-white text-sm ml-auto">
                                      {ticket.fecha}
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-1 w-full">
                                    {ticket.split?.length > 0 &&
                                      ticket.split.map((sp, spIndex) => (
                                        <div
                                          key={spIndex}
                                          className="flex flex-row gap-2 w-full justify-between"
                                        >
                                          <span className="font-semibold">
                                            {getParticipanteNombreApellido(
                                              sp.participanteId
                                            )}
                                          </span>
                                          <div className="space-x-1">
                                            <span className="font-semibold">
                                              Gastó $
                                              {ticket.montoTotalTicket *
                                                (sp.porcentaje / 100)}
                                            </span>
                                            <span className="text-red-500">
                                              ({sp.porcentaje}%)
                                            </span>
                                          </div>
                                        </div>
                                      ))}

                                    <span className="font-bold text-lg ml-auto">
                                      Total: $
                                      {ticket.montoTotalTicket.toFixed(2)}
                                    </span>
                                  </div>
                                  {ticket.imagen ? (
                                    <>
                                    <button 
                                      onClick={() => setShowTicketImagen(!showTicketImagen)}
                                      className="text-left underline text-xs hover:opacity-90 text-brandblue">
                                      {showTicketImagen ? 'Esconder imagen del ticket' : 'Ver imagen del ticket'}
                                    </button>
                                    {showTicketImagen && <img src={ticket.imagen} className="w-96 h-96"/>}
                                    </>
                                  ) : 
                                  <button 
                                      onClick={() => alert("Imagen agregada")}
                                      className="text-left underline text-xs hover:opacity-90 text-brandblue">
                                      Agregar imagen del ticket
                                    </button>}
                                </div>
                              ))}
                            <button className="my-3 w-full border-2 border-brandblue text-brandblue rounded-lg py-2 px-4 hover:opacity-80">
                              Agregar ticket
                            </button>
                            <div className="border border-1 bg-white p-5 rounded-xl shadow-md w-full text-center">
                              <span className="font-bold text-2xl">
                                Total: ${gasto.montoTotalGasto.toFixed(2)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">
                    No hay gastos registrados.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 border border-1 bg-white p-5 rounded-xl shadow-md">
              <h2 className="text-2xl text-left font-bold">Balances</h2>
              <div className="flex flex-col gap-2">
                {projectData.participantes?.length > 0 ? (
                  projectData.participantes.map(
                    (participante, participanteIndex) => {
                      const { texto, color } = calcularGastoParticipante(
                        projectData,
                        participante
                      );
                      return (
                        <div
                          key={participanteIndex}
                          className="flex flex-row bg-white p-5 rounded-xl shadow-md"
                        >
                          <span className="text-lg lg:text-2xl font-semibold">
                            {getParticipanteNombreApellido(participante)}
                          </span>
                          <span
                            className={`text-lg lg:text-2xl font-bold ml-auto ${color}`}
                          >
                            {texto}
                          </span>
                        </div>
                      );
                    }
                  )
                ) : (
                  <span>No hay participantes</span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {editandoProyecto == true && (
        <>
          {
            <NewParticipantModal
              isOpen={modalIsOpen}
              onClose={closeModal}
              onAddParticipant={handleAddParticipant}
            />
          }
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2">
              <button
                onClick={handleSaveProyecto}
                className="flex flex-row bg-green-600 rounded-xl border border-1 w-fit p-3 gap-2 hover:bg-opacity-80"
              >
                <span className="text-white text-sm">Guardar cambios</span>
              </button>
              <button
                onClick={handleEditarClick}
                className="flex flex-row bg-red-600 rounded-xl border border-1 w-fit p-3 gap-2 hover:bg-opacity-80"
              >
                <span className="text-white text-sm">Cancelar edición</span>
              </button>
              <button className="flex flex-row bg-red-600 rounded-xl border border-1 w-fit p-3 gap-2 hover:bg-opacity-80 ml-auto">
                <span className="text-white font-semibold text-sm">
                  ¡Eliminar proyecto!
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 border border-1 bg-white p-5 rounded-xl shadow-md">
            <div className="flex flex-row lg:justify-between gap-5">
              <input
                className="lg:text-4xl text-xl text-left font-extrabold w-[auto] border-b"
                value={projectData.nombre}
                onChange={handleEditNombre}
                placeholder="Ingrese título del proyecto..."
              />
              {projectData.estado === "En progreso" ? (
                <div className="flex flex-row gap-1 bg-orange-600 lg:p-3 p-1.5 bg-opacity-40 rounded-xl text-gray-800 cursor-default select-none text-xs lg:text-sm">
                  <button className="bg-orange-600 bg-opacity-10 rounded-full p-1 hover:opacity-80">
                    <ArrowsUpDown />
                  </button>
                  <span className="font-semibold flex items-center justify-center text-center ">
                    Finalizado
                  </span>
                </div>
              ) : (
                <div className="flex flex-row gap-1 bg-green-600 lg:p-3 p-1.5  bg-opacity-40 rounded-xl text-gray-800 cursor-default select-none text-xs lg:text-sm">
                  <button className="bg-green-600 bg-opacity-10 rounded-full p-1 hover:opacity-80">
                    <ArrowsUpDown />
                  </button>
                  <span className="font-semibold flex items-center justify-center text-center">
                    Finalizado
                  </span>
                </div>
              )}
            </div>
            <input
              className="text-gray-500 font-medium w-[auto] border-b"
              value={projectData.descripcion}
              onChange={handleEditDescripcion}
              placeholder="Ingrese descripción del proyecto..."
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col w-full border border-1 bg-white rounded-xl shadow-md p-5 lg:w-[50%]">
              <h2 className="text-2xl text-left font-bold">
                Monto total gastado
              </h2>
              <span className="text-4xl font-bold mt-auto">
                $
                {projectData.montoTotalProyecto &&
                  projectData.montoTotalProyecto.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col w-full border border-1 bg-white rounded-xl shadow-md p-5 lg:w-[50%] gap-4">
              <h2 className="text-2xl text-left font-bold">Participantes</h2>
              <span className="text-4xl font-bold">
                {projectData.participantes.length || "1"}
              </span>
              <div className="flex flex-row gap-4">
                {projectData.participantes.length > 0 &&
                  projectData.participantes.map((p, index) => (
                    <span
                      key={index}
                      className="rounded-full w-12 h-12 flex items-center justify-center border border-1 border-gray-400 bg-brandblue text-white font-semibold p-2"
                    >
                      {getInicialesParticipante(p)}
                    </span>
                  ))}
                <button
                  onClick={openModal}
                  className="rounded-full w-12 h-12 flex items-center justify-center border border-1 border-gray-400 bg-white text-black hover:bg-gray-50 font-semibold p-2"
                >
                  <UserPlus />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 border border-1 bg-white p-5 rounded-xl shadow-md">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-2xl text-left font-bold">
                  Gastos del proyecto
                </h2>
                <button className="border-2 border-brandblue text-brandblue rounded-lg lg:py-2 lg:px-4 p-1 lg:text-base text-sm hover:opacity-80">
                  Agregar gasto
                </button>
              </div>
              <div className={`flex flex-col gap-2`}>
                {projectData.gastos.length > 0 ? (
                  projectData.gastos.map((gasto, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center border-2 rounded-xl gap-2 w-full"
                    >
                      <div className="flex flex-col gap-3 items-left bg-white p-5 rounded-xl shadow-md w-full">
                        <div className="flex flex-row gap-2 items-center">
                          <button
                            onClick={() => toggleGasto(index)}
                            className="bg-gray-200 rounded-full p-1 hover:opacity-80"
                          >
                            <ChevronDown />
                          </button>
                          <span className="font-semibold text-xl lg:text-2xl rounded-lg">
                            {gasto.descripcion}
                          </span>
                          <span className="font-bold text-xl lg:text-2xl rounded-lg ml-auto">
                            ${gasto.montoTotalGasto.toFixed(2)}
                          </span>
                        </div>
                        {gastosExpandidos[index] && (
                          <>
                            {gasto.tickets?.length > 0 &&
                              gasto.tickets.map((ticket, ticketIndex) => (
                                <div
                                  key={ticketIndex}
                                  className="flex flex-col gap-5 bg-gray-100 border-2 rounded-lg w-full text-base px-5 py-2 justify-center"
                                >
                                  <div className="flex flex-row gap-4">
                                    <span className="font-extrabold text-xl">
                                      {ticket.descripcion}
                                    </span>
                                    <span className="text-gray-500 bg-white text-md ml-auto">
                                      {ticket.fecha}
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-1 w-full">
                                    {ticket.split?.length > 0 &&
                                      ticket.split.map((sp, spIndex) => (
                                        <div
                                          key={spIndex}
                                          className="flex flex-row gap-2 w-full justify-between"
                                        >
                                          <span className="font-semibold">
                                            {getParticipanteNombreApellido(
                                              sp.participanteId
                                            )}
                                          </span>
                                          <div className="space-x-1">
                                            <span className="font-semibold">
                                              Gastó $
                                              {ticket.montoTotalTicket *
                                                (sp.porcentaje / 100)}
                                            </span>
                                            <span className="text-red-500">
                                              ({sp.porcentaje}%)
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    <span className="font-bold text-lg ml-auto">
                                      Total: $
                                      {ticket.montoTotalTicket.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            <div className="border border-1 bg-white p-5 rounded-xl shadow-md w-full text-center">
                              <span className="font-bold text-2xl">
                                Total: ${gasto.montoTotalGasto.toFixed(2)}
                              </span>
                              <button className="w-full border-2 border-brandblue text-brandblue rounded-lg py-2 px-4 hover:opacity-80">
                                Agregar ticket
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">
                    No hay gastos registrados.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 border border-1 bg-white p-5 rounded-xl shadow-md">
              <h2 className="text-2xl text-left font-bold">Balances</h2>
              <div className="flex flex-col gap-2">
                {projectData.participantes?.length > 0 ? (
                  projectData.participantes.map(
                    (participante, participanteIndex) => {
                      const { texto, color } = calcularGastoParticipante(
                        projectData,
                        participante
                      );
                      return (
                        <div
                          key={participanteIndex}
                          className="flex flex-row bg-white p-5 rounded-xl shadow-md"
                        >
                          <span className="text-lg lg:text-2xl font-semibold">
                            {getParticipanteNombreApellido(participante)}
                          </span>
                          <span
                            className={`text-lg lg:text-2xl font-bold ml-auto ${color}`}
                          >
                            {texto}
                          </span>
                        </div>
                      );
                    }
                  )
                ) : (
                  <span>No hay participantes</span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
