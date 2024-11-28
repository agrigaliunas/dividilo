import React from "react";
import { ProjectExpense } from "./ProjectExpense";

export const ProjectExpenses = ({ expenses, participantesProyecto, editMode, openGastoModal }) => {
  return (
    <div className="flex flex-col gap-4 border border-1 bg-white p-5 rounded-xl shadow-md">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl text-left font-bold">Gastos del proyecto</h2>
        {editMode && (
          <button
          onClick={openGastoModal}
          className="border-2 border-brandblue text-brandblue rounded-lg lg:py-2 lg:px-4 p-1 lg:text-base text-sm hover:opacity-80"
        >
          Agregar gasto
        </button>
        )}
      </div>
      <div className={`flex flex-col gap-2`}>
        {expenses.length > 0 ? (
          expenses.map((exp, i) => (
            <ProjectExpense expense={exp} index={i} participantesproyecto={participantesProyecto}/>
          ))
        ) : (
          <span className="text-gray-500">No hay gastos registrados.</span>
        )}
      </div>
    </div>
  );
};
