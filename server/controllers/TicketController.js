const TicketService = require('../services/TicketService');

const uploadImage = async (req, res) => {
    try {
        const response = await TicketService.uploadImage(req.body);
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