const { Router } = require("express");
const validateRequest = require("../middlewares/request_validator");
const { check } = require("express-validator");
const ExpenseController = require("../controllers/ExpenseController");
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
    check("project_id")
      .not()
      .isEmpty()
      .withMessage("El id del proyecto es requerido")
      .trim(),

    validateRequest,
  ],
  ExpenseController.addExpense
);

router.delete("/:expenseId", validateJwt, ExpenseController.deleteExpense);

router.patch("/:expenseId", validateJwt, ExpenseController.updateExpense);

router.get(
  "/project/:projectId",
  validateJwt,
  ExpenseController.getExpensesByProjectId
);

router.get(
  "/project/:projectId/expenses-with-tickets",
  validateJwt,
  ExpenseController.getExpensesWithTicketsByProjectId
);

module.exports = router;
