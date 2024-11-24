const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const {check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

// TODO: agregar jwtValidator


router.post('/register',
    [
        check("name")
            .not().isEmpty().withMessage('El nombre es requerido')
            .trim()
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
            
        check("lastname")
            .not().isEmpty().withMessage('El apellido es requerido')
            .trim()
            .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
            
        check("email")
            .not().isEmpty().withMessage('El email es requerido')
            .trim()
            .isEmail().withMessage('Debe ser un email válido'),
            
        check("password")
            .not().isEmpty().withMessage('La contraseña es requerida')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
            .matches(/^(?=.*[A-Z])/).withMessage('La contraseña debe tener al menos una mayúscula')
            .matches(/^(?=.*[a-z])/).withMessage('La contraseña debe tener al menos una minúscula')
            .matches(/^(?=.*\d)/).withMessage('La contraseña debe tener al menos un número'),
            
        validateRequest,
    ],
    AuthController.register
);


router.post('/login',
    [
        check("email")
            .not().isEmpty().withMessage('El email es requerido')
            .trim()
            .isEmail().withMessage('Debe ser un email válido'),
        check("password")
            .not().isEmpty().withMessage('La contraseña es requerida'),
        validateRequest
    ],
    AuthController.login
);

router.patch('/restore-password',
    [
        check("newPassword")
            .not().isEmpty().withMessage('La contraseña nueva es requerida'),
        check("email")
        .not().isEmpty().withMessage('El email es requerido')
        .trim()
        .isEmail().withMessage('Debe ser un email válido'),
        validateRequest
    ],
    AuthController.restorePassword
)

module.exports = router ;
