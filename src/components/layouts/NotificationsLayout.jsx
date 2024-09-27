import React from "react";

const notifications = [
  {
    id: 1,
    message:
      "Participante agregado en Proyecto de trabajo colaborativo: Juan Pérez",
    type: "info",
  },
  {
    id: 2,
    message: "Nuevo proyecto agregado: Proyecto de trabajo colaborativo",
    type: "info",
  },
  {
    id: 3,
    message: "Ticket agregado para el viaje a Bariloche",
    type: "success",
  },
  { id: 4, message: "Gasto pendiente: Viaje MDQ", type: "warning" },
];

const Notification = ({ message, type }) => {
  const getTypeClass = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-500 text-green-700";
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-700";
      case "info":
      default:
        return "bg-blue-100 border-blue-500 text-blue-700";
    }
  };

  return (
    <div
      className={`flex items-center p-4 mb-2 border-l-4 rounded ${getTypeClass()}`}
    >
      <div className="flex-1">{message}</div>
    </div>
  );
};

const NotificationsLayout = () => {
  return (
    <div className="p-4 space-y-3">
      <h2 className="lg:text-5xl text-4xl font-semibold">Notificaciones</h2>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
        />
      ))}
    </div>
  );
};

export default NotificationsLayout;
