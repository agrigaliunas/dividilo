import React from "react";
import { ArrowsUpDown } from "../icons/ArrowsUpDown";

export const ProjectTitle = ({
  project,
  editMode,
  onChangeProjectStatus,
  onEditTitle,
  onEditDescription,
}) => {
  const handleStateChange = () => {
    const newState = project.state === "En progreso" ? "Finalizado" : "En progreso";
    onChangeProjectStatus(newState);
  };

  const renderProjectState = () => {
    const isInProgress = project.state === "En progreso";
    const bgColor = isInProgress ? "bg-orange-600" : "bg-green-600";
    const textColor = "text-gray-800";

    return (
      <div
        className={`flex flex-row gap-1 ${bgColor} w-fit lg:p-3 p-1.5 bg-opacity-40 rounded-xl ${textColor} cursor-default select-none text-xs lg:text-sm`}
      >
        {editMode && (
          <button
            onClick={handleStateChange}
            className={`${bgColor} bg-opacity-10 rounded-full p-1 hover:opacity-80`}
            aria-label={`Cambiar estado a ${isInProgress ? "Finalizado" : "En progreso"}`}
          >
            <ArrowsUpDown />
          </button>
        )}
        <span className="font-semibold flex items-center justify-center text-center">
          {project.state}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 border border-1 bg-white p-5 rounded-xl shadow-md">
      <div className="flex flex-row w-fit lg:justify-between gap-5">{renderProjectState()}</div>

      {editMode ? (
        <input
          type="text"
          className="lg:text-4xl text-xl text-left font-extrabold w-full border-b border-black bg-transparent border-dashed border-spacing-3"
          value={project.title || ""}
          onChange={(e) => onEditTitle(e.target.value)}
          placeholder="Ingrese título del proyecto..."
          aria-label="Editar título del proyecto"
        />
      ) : (
        <h1 className="lg:text-4xl text-xl text-left font-extrabold">
          {project.title || "Sin título"}
        </h1>
      )}

      {editMode ? (
        <input
          className="text-gray-500 font-medium w-full border-b border-black bg-transparent border-dashed border-spacing-3"
          value={project.description || ""}
          onChange={(e) => onEditDescription(e.target.value)}
          placeholder="Ingrese descripción del proyecto..."
          aria-label="Editar descripción del proyecto"
        />
      ) : (
        <span className="text-gray-500 font-medium">
          {project.description || "Sin descripción"}
        </span>
      )}
    </div>
  );
};
