import React from "react";

export const ProjectTotalAmount = ({project}) => {
  return (
    <div className="flex flex-col w-full border border-1 bg-white rounded-xl shadow-md p-5 lg:w-[50%] gap-4">
      <h2 className="text-2xl text-left font-bold">Monto total gastado</h2>
      <span className="text-4xl font-bold mt-auto">
        ${project.total_amount}
      </span>
    </div>
  );
};
