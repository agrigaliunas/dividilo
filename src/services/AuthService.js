import { fetchUsuarios } from "./UserService.js";

export const crearCuenta = async (nuevoUsuario) => {
  const response = await fetch(`http://localhost:8000/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoUsuario),
  });
  return response;
};

export const restaurarPassword = async (id, usuarioOriginal) => {
  const datosActualizados = {
    ...usuarioOriginal,
    password: "123456",
  };

  const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosActualizados),
  });

  return response;
};

export const checkEmailExists = async (email) => {
    const usuarios = await fetchUsuarios();
    const usuario = await usuarios.find((usuario) => usuario.email === email);
    return usuario;
}