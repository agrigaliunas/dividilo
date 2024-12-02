import React, { useState } from "react";
import { ChevronDown } from "../icons/ChevronDown";
import { ProjectTicket } from "./ProjectTicket";
import { ChevronUp } from "../icons/ChevronUp";
import { Trash } from "../icons/Trash";
import { deleteExpense } from "../../services/ExpenseService";
import { useAuth } from "../../contexts/AuthContext";

export const ProjectExpense = ({
  expense,
  modeEdit,
  onEditExpenseTitle,
  index,
  participantesproyecto,
  openAddTicketModal,
  onEditTicket,
}) => {
  const [gastosExpandidos, setGastosExpandidos] = useState({});

  const {user} = useAuth()

  const toggleGasto = (index) => {
    setGastosExpandidos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDeleteExpense = async () => {
    await deleteExpense(expense.expense_id, user.token, user)

    window.location.reload(true)
  }

  return (
    <div
      key={index}
      className="flex flex-col items-center border-2 rounded-xl gap-2 w-full"
    >
      <div className="flex flex-col gap-3 items-left bg-white p-5 rounded-xl shadow-md w-full">
        {modeEdit ? (
          <>
            <button
              onClick={() => handleDeleteExpense()}
              className="bg-red-200 upper rounded-md py-1 hover:opacity-80 px-4 flex text-red-800 w-fit ml-auto"
            >
              <Trash style="w-6 h-6" /> Eliminar gasto
            </button>
            <input
              type="text"
              className="font-bold text-center text-xl lg:text-2xl rounded-lg border-b border-black bg-transparent border-dashed border-spacing-3"
              value={expense.title || ""}
              onChange={(e) => onEditExpenseTitle(e.target.value)}
              placeholder="Ingrese título del gasto..."
              aria-label="Editar título del gasto"
            />
          </>
        ) : (
          <span className="font-bold text-center text-xl lg:text-2xl rounded-lg">
            {expense.title}
          </span>
        )}
        <span className="font-bold text-xl text-center lg:text-3xl rounded-lg">
          Total ${expense.total_amount}
        </span>
        {(!expense.tickets || expense.tickets.length === 0) && (
          <span className="text-gray-500 text-center">
            No hay tickets registrados.
          </span>
        )}
        {expense.tickets?.length > 0 && (
          <div className="flex my-1">
            <button
              onClick={() => toggleGasto(index)}
              className="bg-gray-200 rounded-full p-1 hover:opacity-80 w-full flex justify-center items-center text-gray-500 font-semibold"
            >
              {!gastosExpandidos[index] ? (
                <>
                  <ChevronDown />
                  Ver tickets
                </>
              ) : (
                <>
                  <ChevronUp />
                  Esconder tickets
                </>
              )}
            </button>
          </div>
        )}
        {gastosExpandidos[index] && (
          <>
            {expense.tickets?.length > 0 &&
              expense.tickets.map((expenseTicket, ticketIndex) => (
                <>
                  <ProjectTicket
                    editMode={modeEdit}
                    ticket={expenseTicket}
                    index={ticketIndex}
                    participantes={participantesproyecto}
                    editTicket={onEditTicket}
                  />
                  {expense.tickets.length > 1 && (
                    <div className="border border-t-5 border-gray-300"></div>
                  )}
                </>
              ))}
          </>
        )}
        <div className="flex my-1">
          <button
            onClick={() => openAddTicketModal(expense)}
            className="border-2 border-brandblue text-brandblue w-full rounded-lg lg:py-2 lg:px-4 p-1 lg:text-base text-sm hover:opacity-80"
          >
            Agregar ticket
          </button>
        </div>
      </div>
    </div>
  );
};
