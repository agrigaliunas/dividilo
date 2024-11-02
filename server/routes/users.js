const { Router } = require('express');
const UserController = require('../controllers/UserController');
const {body, check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.post('/',
    [
        check("firstname").not().isEmpty(),
        check("lastname").not().isEmpty(),
        check("email").not().isEmpty(),
        check("password").not().isEmpty(),
        validateRequest,
    ],
    UserController.createUser);