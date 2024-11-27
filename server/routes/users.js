const { Router } = require("express");
const UserController = require("../controllers/UserController");
const validateRequest = require("../middlewares/request_validator");
const { check } = require("express-validator");

const router = Router();

// TODO: agregar jwtValidator

router.get("/:userId", UserController.getUserById);

router.delete(
  "/:userId",
  [
    check("password").not().isEmpty().withMessage("La contraseña es requerida"),
    validateRequest,
  ],
  UserController.deleteAccount
);

router.patch(
    "/:userId",
    UserController.updateUser
);

router.patch(
  "/:userId/complete-onboarding",
  UserController.completeOnboarding
);

module.exports = router;
