const { Router } = require('express');
const ProjectController = require('../controllers/ProjectController');
const { check } = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.post('/',
    [
        check("title")
            .not().isEmpty().withMessage('El título es requerido')
            .trim()
            .isLength({ min: 2 }).withMessage('El título debe tener al menos 2 caracteres'),

        check("description")
            .not().isEmpty().withMessage('La descripción es requerida')
            .trim()
            .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
        validateRequest,
    ],
    ProjectController.addProject
);

router.post('/:id',
    [
        check("email")
            .not().isEmpty().withMessage('El email es requerido')
            .trim()
            .isEmail().withMessage('Debe ser un email válido'),
        validateRequest,
    ],
    ProjectController.addParticipant
)

router.get('/user/:userId',
    ProjectController.getProjectsByUserId
)

router.get("/:projectId/users",
    ProjectController.getUsersByProjectId
)

router.delete('/:projectId',
    ProjectController.deleteProject);

module.exports = router;
