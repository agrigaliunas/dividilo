import React, { useEffect, useState } from "react";
import { X } from "../icons/X";
import { createProject } from "../../services/ProjectService.js";
import { useAuth } from "../../contexts/AuthContext.js";


export const NewProjectModal = ({ closeModal }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const {user} = useAuth()

  const handleCrearProyecto = async () => {
    console.log("asdasdasdsa")
    console.log(user)
    try {
      const response = await createProject(nombre, descripcion, user.user_id, user.token)
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error al crear el proyecto.");
      }
      closeModal();
    } catch (error) {
      console.error("Error en la solicitud de creación:", error);
    }
  };

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
          <h2 className="lg:text-4xl text-2xl font-bold">Creando proyecto nuevo</h2>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col justify-center gap-1 w-[50%]">
              <label className="lg:text-2xl text-lg font-semibold">Ingresa un nombre</label>
              <input
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
                type="text"
                className="p-2 border rounded text-sm"
                placeholder="Viaje a New York"
              />
            </div>
            <div className="flex flex-col justify-center gap-1 w-[50%]">
              <label className="lg:text-2xl text-lg font-semibold">Ingresa una descripcion</label>
              <input
                onChange={(e) => setDescripcion(e.target.value)}
                value={descripcion}
                className="p-2 border rounded text-sm"
                placeholder="Viaje con la familia en 2026"
              />
            </div>
          </div>
          <button
            onClick={handleCrearProyecto}
            disabled={!nombre || !descripcion}
            className={`text-white p-2 w-full hover:opacity-90 ${nombre && descripcion ? "bg-green-500" : "bg-gray-500"} rounded-lg`}
            >
            Crear proyecto
          </button>
        </div>
      </div>
    </div>
  );
};
