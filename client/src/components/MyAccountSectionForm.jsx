import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Eye } from "../components/icons/Eye";
import { EyeSlash } from "../components/icons/EyeSlash";

export const MyAccountSectionForm = ({ label, value, onChange, clearForm }) => {
  const { user } = useAuth();
  const [viewPassword, setViewPassword] = useState(false);

  const handleViewPassword = (e) => {
    e.preventDefault();
    setViewPassword(!viewPassword);
  };

  const getPlaceholder = () => {
    switch (label.title) {
      case "Nombre":
        return user.name;
      case "Apellido":
        return user.lastname;
      case "Correo electrónico":
        return user.email;
      case "Contraseña actual":
        return "******";
      case "Nueva contraseña":
        return "Ingresar nueva contraseña";
      case "Repetir nueva contraseña":
        return "Repetir nueva contraseña";
      case "¡Atención! ¡Esta acción no tiene vuelta atrás!":
        return "Ingrese contraseña para eliminar la cuenta...";
      default:
        return label.placeholder || "Ingrese un valor...";
    }
  };

  useEffect(() => {
    if (clearForm) {
      onChange({ target: { name: label.title, value: "" } });
    }
  }, [clearForm]);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-md">{label.title}</label>
      <div className={`flex flex-row justify-between items-center w-full`}>
        <input
          className="py-3 text-sm outline-none w-full"
          type={label.type === "password" && viewPassword ? "text" : label.type}
          placeholder={getPlaceholder()}
          name={label.title}
          value={value}
          onChange={onChange}
        />
        {label.type === "password" && (
          <button onClick={handleViewPassword}>
            {viewPassword ? <Eye /> : <EyeSlash />}
          </button>
        )}
      </div>
    </div>
  );
};
