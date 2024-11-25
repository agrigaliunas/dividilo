import { InfoAccount } from "../icons/InfoAccount.jsx";
import { Padlock } from "../icons/Padlock.jsx";
import { Danger } from "../icons/Danger.jsx";

export const sectionsConfig = [
  {
    step: 0,
    title: "Información personal",
    icon: <InfoAccount />,
    labels: [
      { title: "Nombre", placeholder: "Ingrese nombre...", type: "text" },
      { title: "Apellido", placeholder: "Ingrese apellido...", type: "text" },
      {
        title: "Correo electrónico",
        placeholder: "Ingrese correo electrónico...",
        type: "email",
      },
    ],
    button: "Actualizar información",
    buttonColor: "bg-brandblue",
  },
  {
    step: 1,
    title: "Seguridad",
    icon: <Padlock />,
    labels: [
      {
        title: "Contraseña actual",
        placeholder: "Ingrese contraseña actual...",
        type: "password",
      },
      {
        title: "Nueva contraseña",
        placeholder: "Ingrese nueva contraseña...",
        type: "password",
      },
      {
        title: "Repetir nueva contraseña",
        placeholder: "Ingrese nueva contraseña...",
        type: "password",
      },
    ],
    button: "Actualizar contraseña",
    buttonColor: "bg-brandblue",
  },
  {
    step: 2,
    title: "Zona peligrosa",
    icon: <Danger />,
    labels: [
      {
        title: "¡Atención! ¡Esta acción no tiene vuelta atrás!",
        placeholder: "Ingrese contraseña para eliminar la cuenta...",
        type: "password",
      },
    ],
    button: "Eliminar cuenta",
    buttonColor: "bg-red-600",
  },
];
