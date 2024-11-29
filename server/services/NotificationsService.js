const { Notification } = require("../db/config");

const addNotification = async (notificationData) => {
  try {
    const newNotification = await Notification.create(notificationData);

    return newNotification;
  } catch (err) {
    console.error("Error creando notificación:", err.message);
    throw new Error("Falla al crear una notificación.");
  }
};

const getNotificationsByUserId = async (userId) => {
  try {
    const notifications = await Notification.findAll({
      where: {
        user_to_id: userId,
      },
    });

    return notifications;
  } catch (err) {
    console.error("Error al obtener notificaciones:", err.message);
    throw new Error("No se pudieron obtener las notificaciones.");
  }
};

const deleteNotification = async (id) => {
  try {
    const notification = await Notification.findByPk(id);

    if (notification) {
      await Notification.destroy({
        where: {
          notification_id: id,
        },
      });

      return "Notificación borrada con exito.";
    }
  } catch (error) {
    throw new Error(
      "Ocurrio un error al intentar borrar la notificación: " + error.message
    );
  }
};

module.exports = {
  addNotification,
  getNotificationsByUserId,
  deleteNotification,
};
