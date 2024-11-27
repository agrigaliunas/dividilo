const UserService = require("../services/UserService");

const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const user = await UserService.deleteAccount(req.params.userId, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.userId, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


const completeOnboarding = async (req, res) => {
  try {
    const user = await UserService.completeOnboarding(req.params.userId, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getUserById,
  deleteAccount,
  updateUser,
  completeOnboarding
};
