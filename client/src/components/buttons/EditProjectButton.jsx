import React from "react";
import { EditIcon } from "../icons/EditIcon";

export const EditProjectButton = ({onEditClick}) => {
  return (
    <button
      // onClick={onEditClick}
      className="flex flex-row bg-brandblue rounded-xl border border-1 w-fit p-3 gap-2"
    >
      <span className="text-white">Editar proyecto</span>
      <span className="text-white ">
        <EditIcon />
      </span>
    </button>
  );
};
