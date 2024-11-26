const ExpenseService = require("../services/ExpenseService");

const addExpense = async (req, res) => {
  try {
    const expense = await ExpenseService.addExpense(req.body);
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

const deleteExpense = async(req, res) => {
  try {
      const user = await ExpenseService.deleteExpense(req.params.expenseId);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
}

const updateExpense = async (req, res) => {
  try {
      const response = await ExpenseService.updateExpense(req.params.expenseId, req.body)
      res.status(200).json(response);
  } catch (err) {
      res.status(500).json({
          message: err.message
      });
  }
}

const getExpensesByProjectId = async (req, res) => {
  try {
      const response = await ExpenseService.getExpensesByProjectId(req.params.projectId)
      res.status(200).json(response);
  } catch (err) {
      res.status(500).json({
          message: err.message
      });
  }
}


module.exports = {
  addExpense,
  deleteExpense,
  updateExpense,
  getExpensesByProjectId
};
