const { Split, Ticket } = require("../db/config");


const getTicketById = async (ticketId) => {
  try {
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      throw new Error("Ticket no encontrado.");
    }

    return ticket;
  } catch (error) {
    console.error("Error al obtener ticket:", error.message);
    throw new Error("No se pudo obtener el ticket.");
  }
};

const addSplit = async (splitData) => {
  try {
    const ticket = await getTicketById(splitData.ticket_id);

    if (!ticket) {
      throw new Error("El ticket no existe.");
    }

    let splitsFromTicket = [];
    try {
      splitsFromTicket = await getSplitsByTicketId(splitData.ticket_id);
    } catch (err) {
      splitsFromTicket = [];
    }

    const totalFromSplits = splitsFromTicket.reduce(
      (sum, split) => sum + parseFloat(split.user_amount),
      0.0
    );

    const splitAlreadyExists =
      splitsFromTicket?.filter(
        (split) => split.user_id === splitData.user_id
      ) || false;

    if (splitAlreadyExists.length > 0) {
      throw new Error("El usuario ya tiene un split.");
    }

    const ticketTotalAmount = ticket.amount;

    if (splitData.user_amount > ticketTotalAmount) {
      throw new Error("El monto del split excede el total del ticket.");
    }

    if (ticketTotalAmount - totalFromSplits < splitData.user_amount) {
      throw new Error(
        "El monto del split excede el total de los splits del ticket."
      );
    }

    const percentage = splitData.user_amount / ticketTotalAmount;

    await Split.create({
      user_id: splitData.user_id,
      ticket_id: splitData.ticket_id,
      user_amount: splitData.user_amount,
      user_percentage: percentage,
    });

    return { message: "Split añadido correctamente" };
  } catch (err) {
    console.error("Error creando split:", err.message);
    throw new Error("Falla al crear un split.");
  }
};

const removeSplit = async (splitId, ticketId) => {
  try {
    await Split.destroy({ where: { split_id: splitId } });

    return { message: "Split eliminado correctamente" };
  } catch (err) {
    console.error("Error eliminando split:", err.message);
    throw new Error("Falla al eliminar un split.");
  }
};

const removeSplitFromUserByProjectId = async (userId, projectId) => {
  try {
    
    const { getExpensesWithTicketsByProjectId } = require("../services/ExpenseService")


    const expensesWithTickets = await getExpensesWithTicketsByProjectId(projectId);

    expensesWithTickets.map((expense) => {
      const ticketsFromExpense = expense.tickets;
      ticketsFromExpense.map(async (ticket) => {
        await Split.destroy({
          where: {
            user_id: userId,
            ticket_id: ticket.ticket_id
          }
        });
      })
    }
    );

    return { message: "Split eliminado correctamente" };
  } catch (err) {
    console.error("Error eliminando split:", err.message);
    throw new Error("Falla al eliminar un split.");
  }
};

const updateSplitPercentage = async (splitId, newPercentage) => {
  try {
    const updatedSplit = await Split.update(
      {
        user_percentage: newPercentage,
      },
      {
        where: {
          split_id: splitId,
        },
      }
    );
    return updatedSplit;
  } catch (err) {
    throw new Error("Error al actualizar split: " + err.message);
  }
};

const updateSplit = async (splitId, splitData) => {
  try {
    const splitToUpdate = await getSplitById(splitId);

    if (!splitToUpdate) {
      throw new Error("El split que intentas actualizar no existe.");
    }

    const splitsFromTicket = await getSplitsByTicketId(splitToUpdate.ticket_id);

    const ticket = await getTicketById(splitToUpdate.ticket_id);

    const totalFromSplits =
      splitsFromTicket.reduce(
        (sum, split) => sum + parseFloat(split.user_amount),
        0.0
      ) - splitToUpdate.user_amount;

    const ticketTotalAmount = ticket.amount;

    if (splitData.user_amount > ticketTotalAmount) {
      throw new Error("El monto del split excede el total del ticket.");
    }

    if (splitData.user_amount > ticketTotalAmount - totalFromSplits) {
      throw new Error(
        "El monto del split excede el total de los splits del ticket."
      );
    }

    const percentage = splitData.user_amount / ticketTotalAmount;

    await Split.update(
      {
        user_amount: splitData.user_amount,
        user_percentage: percentage,
      },
      {
        where: { split_id: splitToUpdate.split_id },
      }
    );

    return { message: "Split actualizado correctamente" };
  } catch (err) {
    console.error("Error actualizando split:", err.message);
    throw new Error("Falla al actualizar el split.");
  }
};

const getSplitById = async (splitId) => {
  try {
    const split = await Split.findOne({
      where: { split_id: splitId },
    });

    if (!split) {
      throw new Error("Split no encontrado");
    }

    return split;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getSplitsByTicketId = async (ticketId) => {
  try {
    const splits = await Split.findAll({
      where: { ticket_id: ticketId },
    });

    if (splits.length > 0) {
      return splits;
    }

    return []

  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  addSplit,
  updateSplit,
  removeSplit,
  getSplitById,
  getSplitsByTicketId,
  updateSplitPercentage,
  removeSplitFromUserByProjectId
};
