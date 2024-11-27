const TicketService = require('../services/TicketService');

const uploadImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: 'No se envió ninguna imagen.' });
        }

        const response = await TicketService.uploadImage(req.file.buffer);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

const addTicket = async (req, res) => {
    try {
        const ticket = await TicketService.addTicket(req.body);
        res.status(201).json(ticket);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const ticket = await TicketService.deleteTicket(req.params.ticketId);
        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


const getTicketById = async (req, res) => {
    try {
        const response = await TicketService.getTicketById(req.params.ticketId)
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

const getTicketsByExpenseId = async (req, res) => {
    try {
        const response = await TicketService.getTicketsByExpenseId(req.params.expenseId)
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    uploadImage,
    addTicket,
    deleteTicket,
    getTicketById,
    getTicketsByExpenseId
}