const { Router } = require('express');
const UserController = require('../controllers/UserController');
const {check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/:userId',
    UserController.getUserById);

router.delete('/:userId',
    UserController.deleteAccount);

module.exports = router ;
