import React, { useState, useEffect } from "react";
import { EditIcon } from "./icons/EditIcon";
import { PaperAirplane } from "./icons/PaperAirplane";


/*

TODO:
    - fecha del proyecto
    - debes
    - te deben
    (VER SPLITWISE)
    - cuanto debe cada uno
        - en % y en $
    
    - tickets de compra

*/


export const ProjectInfo = ({ project }) => {
  const [projectNombre, setProjectNombre] = useState("");
  const [disableEditNombre, setDisableEditNombre] = useState(true);

  useEffect(() => {
    setProjectNombre(project.nombre);
  }, [project.nombre]);

  const handleEditNombre = (e) => {
    setProjectNombre(e.target.value);
  };

  const handleEnableEditNombre = () => {
    setDisableEditNombre(false);
  };

  const handleSaveNombre = async () => {
    await fetch("http://localhost:8000/proyectos/" + project.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: project.id,
        nombre: projectNombre,
        descripcion: project.descripcion,
        montoTotal: project.montoTotal,
        estado: project.estado,
        participantes: project.participantes,
      }),
    });
  };

  const handleNameClick = () => {
    if (disableEditNombre) {
      handleEnableEditNombre();
    } else {
      handleSaveNombre();
    }
  };

  return (
    <div className="bg-white w-[80vw] p-4 rounded-xl flex flex-col gap-5">
      <div className="flex flex-col gap-3 justify-center">
        <div className="flex flex-row gap-2 items-center p-1">
          <input
            disabled={disableEditNombre}
            onChange={handleEditNombre}
            className="text-2xl font-semibold border-b border-gray-400 p-1"
            value={projectNombre}
            placeholder={projectNombre}
          />
          <button
            onClick={handleNameClick}
            className={`rounded-md p-1 ${
              disableEditNombre ? "bg-gray-200" : "bg-green-200"
            } hover:opacity-80 flex items-center justify-center gap-2`}
          >
            <span className="text-xs">
              {!disableEditNombre ? "Guardar" : "Editar"}
            </span>
            {disableEditNombre ? <EditIcon /> : <PaperAirplane />}
          </button>
        </div>
        <span className="text-lg">{project.descripcion}</span>
      </div>
    </div>
  );
};
