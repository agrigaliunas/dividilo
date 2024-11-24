const { Router } = require('express');
const multer = require('multer');
const TicketController = require('../controllers/TicketController');

const upload = multer();
const router = Router();

router.post('/images',
    upload.single('file'),
    TicketController.uploadImage);

module.exports = router ;
