const { Expense, Ticket } = require("../db/config");
const { Op } = require("sequelize");
const { deleteExpenseAmount, addExpenseAmount, getUsersByProjectId, getProjectById } = require("./ProjectService");
const { getUserById } = require("./UserService")
const { addNotification } = require("./NotificationsService")

const addExpense = async (expenseData) => {
  try {
    const newExpense = await Expense.create(expenseData);
    const userFromNotification = await getUserById(expenseData.user_from_id)
    const project = await getProjectById(expenseData.project_id)

    const notificationMessage = `${userFromNotification.name} ${userFromNotification.lastname} ha agregado el gasto ${newExpense.title} en el proyecto ${project.title}`;

    const usersFromProject = await getUsersByProjectId(newExpense.project_id)

    const filteredUsers = usersFromProject.filter(user => user.user_id !== userFromNotification.user_id);
  
    filteredUsers.map(async (user) => {
      await addNotification({
        user_from_id: userFromNotification.user_id,
        user_to_id: user.user_id,
        project_id: newExpense.project_id,
        message: notificationMessage,
        type: 'Success'
      });
    })

    return newExpense;
  } catch (err) {
    console.error("Error creando gasto:", err.message);
    throw new Error("Falla al crear un gasto.");
  }
};

const deleteExpense = async (id) => {

  // TODO: Agregar el parametro userFromNotification cuando este la funcionalidad de borrar gasto en el front-end

  try {
    const expense = await Expense.findByPk(id);

    if (expense) {
      await Expense.destroy({
        where: {
          expense_id: id,
        },
      });

    // const project = await getProjectById(expense.project_id)

    // const notificationMessage = `${user.name} ${user.lastname} ha borrado el gasto ${expense.title} en el proyecto ${project.title}`;

    // const usersFromProject = await getUsersByProjectId(project.project_id)

    // const filteredUsers = usersFromProject.filter(user => user.user_id !== userFromNotification.user_id);

    // filteredUsers.map(async (user) => {
    //   await addNotification({
    //     user_from_id: userFromNotifiacion.user_id,
    //     user_to_id: user.user_id,
    //     project_id: project.project_id,
    //     message: notificationMessage,
    //     type: 'Warning'
    //   });
    // })

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



const addTicketAmount = async (id, amount, transaction) => {
  try {
    const expense = await Expense.findByPk(id, { transaction });
    if (!expense) {
      throw new Error("Gasto no existente.");
    }

    await expense.update(
      { total_amount: Number(expense.total_amount) + Number(amount) },
      { transaction }
    );

    await addExpenseAmount(expense.project_id, amount, transaction);
  } catch (error) {
    throw new Error("Falla al actualizar monto del gasto: " + error.message);
  }
};

const deleteTicketAmount = async (id, amount, transaction) => {
  try {
    const expense = await Expense.findByPk(id, { transaction });
    if (!expense) {
      throw new Error("Gasto no existente.");
    }

    await expense.update(
      { total_amount: Number(expense.total_amount) - Number(amount) },
      { transaction }
    );

    await deleteExpenseAmount(expense.project_id, amount, transaction);
  } catch (error) {
    throw new Error("Falla al actualizar monto del gasto: " + error.message);
  }
};


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
