const { Expense, Ticket } = require("../db/config");
const { Op } = require("sequelize");
const { deleteExpenseAmount, addExpenseAmount } = require("./ProjectService");

const addExpense = async (expenseData) => {
  try {
    const newExpense = await Expense.create(expenseData);
    return newExpense;
  } catch (err) {
    console.error("Error creando gasto:", err.message);
    throw new Error("Falla al crear un gasto.");
  }
};

const deleteExpense = async (id) => {
  try {
    const expense = await Expense.findByPk(id);

    if (expense) {
      await Expense.destroy({
        where: {
          expense_id: id,
        },
      });

      await deleteExpenseAmount(expense.project_id, expense.total_amount)

      return "Gasto borrado con exito.";
    }
  } catch (error) {
    throw new Error(
      "Ocurrio un error al intentar borrar el gasto: " + error.message
    );
  }
};

const updateExpense = async (id, req) => {
  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      throw new Error("Gasto no existente.");
    }

    await expense.update({
      title: req.title || expense.title,
      total_amount: req.total_amount || expense.total_amount,
      project_id: req.project_id || expense.project_id,
    });

    return "Gasto actualizado con exito.";
  } catch (error) {
    throw new Error(
      "Ocurrio un error al intentar actualizar el proyecto: " + error.message
    );
  }
};

const getExpensesByProjectId = async (projectId) => {
  try {
    const expenses = await Expense.findAll({
      where: {
        project_id: projectId,
      },
    });

    return expenses;
  } catch (err) {
    console.error("Error al obtener proyectos:", err.message);
    throw new Error("No se pudieron obtener los proyectos.");
  }
};

const getExpensesWithTicketsByProjectId = async (projectId) => {
  try {
    const expenses = await getExpensesByProjectId(projectId);

    if (expenses && expenses.length > 0) {
      const expensesWithTickets = await Promise.all(
        expenses.map(async (exp) => {
          const { getTicketsByExpenseId } = require("./TicketService");
          const ticketsByExpenseId = await getTicketsByExpenseId(exp.expense_id);
          return {
            expense_id: exp.expense_id,
            title: exp.title,
            total_amount: exp.total_amount,
            project_id: exp.project_id,
            tickets: ticketsByExpenseId
          };
        })
      );

      return expensesWithTickets;
    }

    return []; 
  } catch (error) {
    console.error("Error al obtener gastos con tickets:", error);
    throw new Error("Falla al obtener gastos con tickets.");
  }
};



const addTicketAmount = async (id, amount) => {
  try {
      const expense = await Expense.findByPk(id);
      if (!expense) {
        throw new Error("Gasto no existente.");
      }
  
      await expense.update({
        total_amount: expense.total_amount + amount || expense.total_amount
      });

      await addExpenseAmount(expense.project_id, amount)

  } catch (error) {
      console.error("Error actualizando monto del gasto:", error.message);
      throw new Error("Falla al actualizar monto del gasto.");
  }
}

const deleteTicketAmount = async (id, amount) => {
  try {
      const expense = await Expense.findByPk(id);
      if (!expense) {
        throw new Error("Gasto no existente.");
      }
  
      await expense.update({
        total_amount: expense.total_amount - amount || expense.total_amount
      });

      await deleteExpenseAmount(expense.project_id, amount)


  } catch (error) {
      console.error("Error actualizando monto del gasto:", error.message);
      throw new Error("Falla al actualizar monto del gasto.");
  }
}


const getTicketsByExpenseId = async (expenseId) => {
  try {
    const tickets = await Ticket.findAll({
      where: {
        expense_id: expenseId,
      },
    });

    return tickets;
  } catch (err) {
    console.error("Error al obtener tickets:", err.message);
    throw new Error("No se pudieron obtener los tickets.");
  }
};


module.exports = {
  addExpense,
  deleteExpense,
  updateExpense,
  getExpensesByProjectId,
  addTicketAmount,
  deleteTicketAmount,
  getExpensesWithTicketsByProjectId
};
