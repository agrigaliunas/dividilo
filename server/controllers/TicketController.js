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

module.exports = {
    uploadImage
}