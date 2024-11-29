const NotifiactionsService = require("../services/NotificationsService");

const getNotificationsByUserId = async (req, res) => {
  try {
    const notifications = await NotifiactionsService.getNotificationsByUserId(
      req.params.userId
    );
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notification = await NotifiactionsService.deleteNotification(
      req.params.notificationId
    );
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const addNotification = async (req, res) => {
  try {
    const notification = await NotifiactionsService.addNotification(req.body);
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addNotification,
  deleteNotification,
  getNotificationsByUserId,
};
