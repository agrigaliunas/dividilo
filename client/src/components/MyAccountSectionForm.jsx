import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const MyAccountSectionForm = ({ label, value, onChange, clearForm }) => {
  const { user } = useAuth();

  const getPlaceholder = () => {
    switch (label.title) {
      case "Nombre": return user.name;
      case "Apellido": return user.lastname;
      case "Correo electrónico": return user.email;
      case "Contraseña actual": return "******";
      case "Nueva contraseña": return "Ingresar nueva contraseña";
      case "Repetir nueva contraseña": return "Repetir nueva contraseña";
      case "¡Atención! ¡Esta acción no tiene vuelta atrás!": return "Ingrese contraseña para eliminar la cuenta...";
      default: return label.placeholder || "Ingrese un valor...";
    }
  };

  useEffect(() => {
    if (clearForm) {
      onChange({ target: { name: label.title, value: '' } });
    }
  }, [clearForm]);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-md">{label.title}</label>
      <input
        className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
        type={label.type}
        placeholder={getPlaceholder()}
        name={label.title}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
