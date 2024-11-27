const { Ticket } = require("../db/config");
const { addTicketAmount, deleteTicketAmount } = require("./ExpenseService");
const { uploadImageToCloudinary } = require("./ImageService");
const { sequelize } = require('../db/config');

const uploadImage = async (imageBuffer) => {
  try {
    const response = await uploadImageToCloudinary(imageBuffer);
    return response;
  } catch (error) {
    throw new Error("Error al subir imagen. Intente nuevamente");
  }
};

const addTicket = async (ticketData) => {
  try {
    const newTicket = await Ticket.create(ticketData);

    await addTicketAmount(newTicket.expense_id, newTicket.amount);

    return newTicket;
  } catch (err) {
    console.error("Error creando ticket:", err.message);
    throw new Error("Falla al crear un ticket.");
  }
};

const getTicketById = async (ticketId) => {
  try {
    const ticket = await Ticket.findByPk(ticketId);

    return ticket;
  } catch (error) {
    console.error("Error al obtener ticket:", err.message);
    throw new Error("No se pudo obtener el ticket.");
  }
};

const deleteTicket = async (id) => {
  try {
    const ticket = await Ticket.findByPk(id);

    if (ticket) {
      await Ticket.destroy({
        where: {
          expense_id: id,
        },
      });

      await deleteTicketAmount(ticket.expense_id, ticket.amount);

      return "Ticket borrado con exito.";
    }
  } catch (error) {
    throw new Error(
      "Ocurrio un error al intentar borrar el ticket: " + error.message
    );
  }
};

const updateTicket = async (id, req) => {
  const transaction = await sequelize.transaction();
  try {
    const ticket = await Ticket.findByPk(id, { transaction });
    if (!ticket) {
      throw new Error("Ticket no existente.");
    }

    const originalAmount = ticket.amount;

    await deleteTicketAmount(ticket.expense_id, originalAmount, transaction);

    await ticket.update(
      {
        description: req.description || ticket.description,
        amount: req.amount || ticket.amount,
        ticket_date: req.ticket_date || ticket.ticket_date
      },
      { transaction }
    );

    await ticket.reload({ transaction });

    await addTicketAmount(ticket.expense_id, ticket.amount, transaction);

    await transaction.commit();
    return "Ticket actualizado con éxito.";
  } catch (error) {
    await transaction.rollback();
    throw new Error("Ocurrió un error al intentar actualizar el ticket: " + error.message);
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
  uploadImage,
  addTicket,
  deleteTicket,
  updateTicket,
  getTicketsByExpenseId,
  getTicketById,
};
