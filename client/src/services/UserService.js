const BACKEND_URL = "http://localhost:5000/api"


export const fetchUsuarios = async () => {
  const response = await fetch("http://localhost:8000/usuarios");
  const data = await response.json();
  return data;
};

export const eliminarUsuario = async (id, confirmationPassword) => {
  const response = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: confirmationPassword
    }),
  });

  return response;
};

export const actualizarUsuario = async (usuarioActualizado) => {
  const response = await fetch(
    `http://localhost:8000/usuarios/${usuarioActualizado.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioActualizado),
    }
  );

  return response;
};
