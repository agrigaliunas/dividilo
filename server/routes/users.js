const { Router } = require("express");
const UserController = require("../controllers/UserController");
const validateRequest = require("../middlewares/request_validator");
const { check } = require("express-validator");
const validateJwt = require("../middlewares/jwt_validator");

const router = Router();

router.get("/:userId", validateJwt, UserController.getUserById);

router.get("/", validateJwt, UserController.getUserByEmail);

router.delete(
  "/:userId",
  validateJwt,
  [
    check("password").not().isEmpty().withMessage("La contraseña es requerida"),
    validateRequest,
  ],
  UserController.deleteAccount
);

router.patch("/:userId", validateJwt, UserController.updateUser);

router.patch(
  "/:userId/complete-onboarding",
  validateJwt,
  UserController.completeOnboarding
);

module.exports = router;
