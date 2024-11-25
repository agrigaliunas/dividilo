import React from "react";
import { MyAccountSectionForm } from "../MyAccountSectionForm";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { eliminarUsuario } from "../../services/UserService";
import { actualizarContrasena } from "../../services/AuthService";
export const MyAccountSection = ({
  section,
  clearForm,
  formValues,
  onInputChange,
}) => {
  const navigate = useNavigate();
  const { token, user, logout} = useAuth();

  const handleSubmit = async () => {
    try {
      switch (section.step) {
        case 0:
          // await actualizarUsuario(user.user_id, formValues, token);
          alert("Información actualizada correctamente.");
          navigate('/account')
          break;
        case 1:
          if (
            formValues["Contraseña actual"] &&
            formValues["Nueva contraseña"] &&
            formValues["Repetir nueva contraseña"]
          ) {
            if (
              formValues["Nueva contraseña"] !==
              formValues["Repetir nueva contraseña"]
            ) {
              alert("Las contraseñas no coinciden.");
              return;
            }
            await actualizarContrasena(
              user.email,
              formValues["Contraseña actual"],
              formValues["Nueva contraseña"],
              token
            );
            alert("Contraseña actualizada correctamente.");
            navigate('/account')
          } else {
            alert("Por favor complete todos los campos.");
          }
          break;
        case 2:
          const password =
            formValues["¡Atención! ¡Esta acción no tiene vuelta atrás!"];
          if (password) {
            const resp = await eliminarUsuario(user.user_id, password);
            if (resp.status === 200) {
              alert("Cuenta eliminada exitosamente.");
              logout()
              navigate("/home");
            } else {
              alert("Ocurrió un error. Intente nuevamente.")
            }
          } else {
            alert("Por favor, ingrese la contraseña para eliminar su cuenta.");
          }
          break;
        default:
          alert("Acción no válida.");
      }
    } catch (error) {
      console.error("Error al realizar la acción:", error);
      alert("Ocurrió un error. Por favor, inténtelo nuevamente.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="font-bold text-xl">{section?.title}</span>
        {section?.labels.map((label) => (
          <MyAccountSectionForm
            key={label.title}
            label={label}
            value={formValues[label.title]}
            onChange={onInputChange}
            clearForm={clearForm}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className={`${section.buttonColor} text-white p-2 rounded-md hover:opacity-85`}
      >
        {section?.button}
      </button>
    </div>
  );
};
