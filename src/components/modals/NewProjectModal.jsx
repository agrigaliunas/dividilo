import React, { useEffect, useState } from "react";
import { X } from "../icons/X";
import { UserPlus } from "../icons/UserPlus";
import { Trash } from "../icons/Trash";

export const NewProjectModal = ({ closeModal }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [participanteAgregando, setParticipanteAgregando] = useState("");
  const [participanteNoExiste, setParticipanteNoExiste] = useState(true);
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser && loggedUser.email && !participantes.includes(loggedUser.email)) {
      setParticipantes([loggedUser.email]);
    }
  }, []);

  const deleteParticipant = (email) => {
    setParticipantes(participantes.filter((part) => part !== email));
  };

  const checkEmailExiste = async (email) => {
    const usuarios = await fetch("http://localhost:8000/usuarios").then((data) => data.json());
    return usuarios.some((usuario) => usuario.email === email);
  };

  const handleAddParticipant = async () => {
    const participanteExiste = await checkEmailExiste(participanteAgregando);
    if (participanteExiste && !participantes.includes(participanteAgregando)) {
      setParticipanteAgregando("");
      setParticipanteNoExiste(true); 
      setParticipantes([...participantes, participanteAgregando])
    }
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setParticipanteAgregando(email);

    if (email) {
      const existe = await checkEmailExiste(email);
      setParticipanteNoExiste(!existe);
    } else {
      setParticipanteNoExiste(true); 
    }
  };


  const handleCrearProyecto = async () => {
    try {
      const response = await fetch(`http://localhost:8000/proyectos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "nombre": nombre,
          "descripcion": descripcion,
          "participantes": participantes,
          "montoTotalProyecto": 0,
          "gastos": [],
          "estado": "En progreso"
        }),
      });
  
      if (response.ok) {
        window.location.reload()
      } else {
        console.error("Error al crear el usuario.");
      }
      closeModal();
    } catch (error) {
      console.error("Error en la solicitud de creación:", error);
    }
  }

  return (
    <div
      id="modal-overlay"
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="relative bg-white rounded-lg p-5 w-[90%] sm:w-[80%]">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <X />
        </button>
        <div className="flex flex-col gap-5">
          <h2 className="lg:text-4xl text-3xl font-bold">
            Creando proyecto nuevo
          </h2>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col justify-center gap-1 w-[50%]">
              <label className="text-2xl font-semibold">
                Ingresa un nombre
              </label>
              <input
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
                type="text"
                className="p-2 border rounded"
                placeholder="Viaje a New York"
              />
            </div>
            <div className="flex flex-col justify-center gap-1 w-[50%]">
              <label className="text-2xl font-semibold">
                Ingresa una descripcion
              </label>
              <input
                onChange={(e) => setDescripcion(e.target.value)}
                value={descripcion}
                className="p-2 border rounded"
                placeholder="Viaje con la familia en 2026"
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-[50%]">
              <span className="text-2xl font-semibold">
                Agrega participantes
              </span>
              <span className="text-gray-400">
                Escribe el email de cada participante
              </span>
              <div className="flex flex-row border rounded w-fit items-center mt-2">
                <input
                  onChange={handleEmailChange}
                  value={participanteAgregando}
                  className="p-2"
                  type="email"
                  placeholder="ejemplo@gmail.com"
                />
                <button
                  disabled={participanteNoExiste}
                  className={`rounded hover:opacity-90 ${participanteNoExiste ? "bg-gray-500" : "bg-brandblue"}`}
                  onClick={handleAddParticipant}
                >
                  <UserPlus style="size-8 text-white p-1" />
                </button>
              </div>
              {participanteNoExiste && participanteAgregando && (
                <span className="text-red-500">El usuario no existe.</span>
              )}
            </div>
            <div className="flex flex-col w-[50%]">
              <span className="text-2xl font-semibold">
                Participantes agregados
              </span>
              {participantes && participantes.length > 0 && (
                <>
                  {participantes.map((email, index) => (
                    <div className="flex flex-row gap-1 items-center" key={index}>
                      <span className="text-gray-500 font-medium text-lg">
                        {email}
                      </span>
                      <button
                        className="hover:opacity-70"
                        onClick={() => deleteParticipant(email)}
                      >
                        {index !== 0 && <Trash style="size-5" />}
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <button 
          onClick={handleCrearProyecto}
          className="text-white p-2 w-full hover:opacity-90 bg-green-500 rounded-lg">
            Crear proyecto
          </button>
        </div>
      </div>
    </div>
  );
};
