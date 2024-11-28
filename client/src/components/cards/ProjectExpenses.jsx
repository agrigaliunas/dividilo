import React from "react";
import { ProjectExpense } from "./ProjectExpense";

export const ProjectExpenses = ({ expenses, participantesProyecto, editMode, openGastoModal }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center border border-1 bg-white rounded-xl shadow-md p-5">
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

      <div className={`${expenses.length === 1 ? 'flex flex-col' : 'grid grid-cols-2'} gap-2 `}>
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
