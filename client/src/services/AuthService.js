import { fetchUsuarios } from "./UserService.js";

const BACKEND_URL = "http://localhost:5000/api"

export const crearCuenta = async (nuevoUsuario) => {
  const response = await fetch(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoUsuario),
  });
  return response;
};


export const login = async (data) => {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const actualizarContrasena = async (email, password, newPassword) => {

  const datosActualizados = {
    email,
    password,
    newPassword
  };

  const response = await fetch(`${BACKEND_URL}/auth/restore-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosActualizados),
  });

  return response;
}


export const checkEmailExists = async (email) => {
    const usuarios = await fetchUsuarios();
    const usuario = usuarios.find((usuario) => usuario.email === email);
    return usuario;
}