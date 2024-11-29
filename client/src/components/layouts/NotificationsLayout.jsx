import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { fetchNotificationsByUserId } from "../../services/NotificationService.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const Notification = ({ message, type, notification_datetime }) => {
  const getTypeClass = () => {
    switch (type) {
      case "Success":
        return "bg-green-100 border-green-500 text-green-700";
      case "Warning":
        return "bg-red-100 border-red-500 text-red-700";
      case "Update":
        return "bg-yellow-100 border-green-500 text-yellow-700";
    }
  };

  const formattedDate = dayjs(notification_datetime)
    .tz("America/Argentina/Buenos_Aires")
    .format("DD/MM/YYYY HH:mm");

  return (
    <div
      className={`flex items-center p-4 mb-2 border-l-4 rounded ${getTypeClass()}`}
    >
      <div className="flex-1">{message}</div>
      <div className="">{formattedDate}</div>
    </div>
  );
};

const NotificationsLayout = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadNotifications = async () => {
      const notificationsData = await fetchNotificationsByUserId(
        user.user_id,
        user.token
      );
      setNotifications(notificationsData.reverse());
    };
    loadNotifications();
  }, [user.user_id]);

  return (
    <div className="p-4 space-y-3">
      <h2 className="lg:text-5xl text-4xl font-semibold">Notificaciones</h2>
      {!notifications ||
        (notifications.length === 0 && (
          <span className="text-gray-500 text-center">
            No tenés notificaciones actualmente.
          </span>
        ))}
      {notifications.map((notification) => (
        <Notification
          key={notification.notification_id}
          message={notification.message}
          type={notification.type}
          notification_datetime={notification.notification_datetime}
        />
      ))}
    </div>
  );
};

export default NotificationsLayout;
