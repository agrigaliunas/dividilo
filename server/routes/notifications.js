const { Router } = require("express");
const NotificationController = require("../controllers/NotificationController");

const router = Router();

router.post("/", NotificationController.addNotification);

router.delete("/:notificationId", NotificationController.deleteNotification);

router.get("/user/:userId", NotificationController.getNotificationsByUserId);

module.exports = router;