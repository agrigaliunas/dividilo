import React from "react";

export const ProjectEditToolbar = ({onSaveProject, onCancelEdit, onDeleteProject}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-2">
        <button
          onClick={onSaveProject}
          className="flex flex-row bg-green-600 rounded-xl border border-1 w-fit p-3 gap-2 hover:bg-opacity-80"
        >
          <span className="text-white text-sm">Guardar cambios</span>
        </button>
        <button
          onClick={onCancelEdit}
          className="flex flex-row bg-white border-black rounded-xl border-2 w-fit p-3 gap-2 hover:bg-opacity-80"
        >
          <span className=" text-sm">Cancelar edición</span>
        </button>
        <button
          className="flex flex-row bg-red-600 rounded-xl border border-1 w-fit p-3 gap-2 hover:bg-opacity-80 ml-auto"
          onClick={onDeleteProject}
        >
          <span className="text-white font-semibold text-sm">
            ¡Eliminar proyecto!
          </span>
        </button>
      </div>
    </div>
  );
};
