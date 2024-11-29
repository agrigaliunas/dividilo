const { Router } = require("express");
const ProjectController = require("../controllers/ProjectController");
const { check } = require("express-validator");
const validateRequest = require("../middlewares/request_validator");
const validateJwt = require("../middlewares/jwt_validator");

const router = Router();

router.post(
  "/",
  validateJwt,
  [
    check("title")
      .not()
      .isEmpty()
      .withMessage("El título es requerido")
      .trim()
      .isLength({ min: 2 })
      .withMessage("El título debe tener al menos 2 caracteres"),

    check("description")
      .not()
      .isEmpty()
      .withMessage("La descripción es requerida")
      .trim()
      .isLength({ min: 2 })
      .withMessage("El apellido debe tener al menos 2 caracteres"),
    validateRequest,
  ],
  ProjectController.addProject
);

router.post(
  "/:id",
  validateJwt,
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("El email es requerido")
      .trim()
      .isEmail()
      .withMessage("Debe ser un email válido"),
    validateRequest,
  ],
  ProjectController.addParticipant
);

router.get("/:projectId", validateJwt, ProjectController.getProjectById);

router.get("/user/:userId", validateJwt, ProjectController.getProjectsByUserId);

router.get(
  "/:projectId/users",
  validateJwt,
  ProjectController.getUsersByProjectId
);

router.delete("/:projectId", validateJwt, ProjectController.deleteProject);

router.patch("/:projectId", validateJwt, ProjectController.updateProject);

router.delete(
  "/:projectId/users",
  validateJwt,
  ProjectController.deleteParticipantFromProject
);

module.exports = router;
