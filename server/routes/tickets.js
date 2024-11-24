const { Router } = require('express');
const TicketController = require('../controllers/TicketController');

const router = Router();

router.post('/',
    TicketController.uploadImage);

module.exports = router ;
