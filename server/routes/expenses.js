const { Router } = require("express");
const validateRequest = require("../middlewares/request_validator");
const { check } = require("express-validator");
const ExpenseController = require("../controllers/ExpenseController");

const router = Router();

router.post('/',
  [
    check("title")
      .not().isEmpty().withMessage('El título es requerido')
      .trim()
      .isLength({ min: 2 }).withMessage('El título debe tener al menos 2 caracteres'),
    check("project_id")
      .not().isEmpty().withMessage('El id del proyecto es requerido')
      .trim(),

    validateRequest,
  ],
  ExpenseController.addExpense
);

router.delete('/:expenseId',
  ExpenseController.deleteExpense
)

router.patch("/:expenseId",
  ExpenseController.updateExpense
);

router.get('/project/:projectId',
  ExpenseController.getExpensesByProjectId
)

router.get('/project/:projectId/expenses-with-tickets',
  ExpenseController.getExpensesWithTicketsByProjectId
)


module.exports = router;
