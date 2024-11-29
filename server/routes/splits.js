const { Router } = require("express");
const SplitController = require("../controllers/SplitController");
const { check } = require("express-validator");
const validateRequest = require("../middlewares/request_validator");
const validateJwt = require("../middlewares/jwt_validator");

const router = Router();

router.post(
  "/",
  validateJwt,
  [
    check("ticket_id")
      .not()
      .isEmpty()
      .withMessage("El ticket_id es requerido")
      .isInt()
      .withMessage("El ticket_id debe ser un número entero"),

    check("user_id")
      .not()
      .isEmpty()
      .withMessage("El user_id es requerido")
      .isInt()
      .withMessage("El user_id debe ser un número entero"),

    check("split_type")
      .not()
      .isEmpty()
      .withMessage("El split type es requerido"),

    validateRequest,
  ],
  SplitController.addSplit
);

router.put(
  "/:splitId",
  validateJwt,
  [
    check("user_amount")
      .not()
      .isEmpty()
      .withMessage("El monto es requerido")
      .isFloat({ min: 0 })
      .withMessage("El monto debe ser un número mayor a 0"),

    validateRequest,
  ],
  SplitController.updateSplit
);

router.delete("/:splitId", validateJwt, SplitController.deleteSplit);

router.get("/:splitId", validateJwt, SplitController.getSplitById);

router.get(
  "/ticket/:ticketId",
  validateJwt,
  SplitController.getSplitsByTicketId
);

router.delete(
  "/splits/:projectId/user/:userId",
  SplitController.removeSplitFromUserByProjectId
);

module.exports = router;
