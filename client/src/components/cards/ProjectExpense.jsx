import React, { useState } from "react";
import { ChevronDown } from "../icons/ChevronDown";
import { ProjectTicket } from "./ProjectTicket";

export const ProjectExpense = ({ expense, index, participantesproyecto }) => {
  const [gastosExpandidos, setGastosExpandidos] = useState({});


  const toggleGasto = (index) => {
    setGastosExpandidos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
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
            {expense.title}
          </span>
          <span className="font-bold text-xl lg:text-2xl rounded-lg ml-auto">
            ${expense.total_amount}
          </span>
        </div>
        {gastosExpandidos[index] && (
          <>
            {expense.tickets?.length > 0 &&
              expense.tickets.map((expenseTicket, ticketIndex) => (
                <ProjectTicket ticket={expenseTicket} index={ticketIndex} participantes={participantesproyecto}/>
              ))}
          </>
        )}
      </div>
    </div>
  );
};
