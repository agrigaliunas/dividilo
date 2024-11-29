const BACKEND_URL = "http://localhost:5000/api";

export const fetchUsuarioById = async (id, token) => {
  const response = await fetch(`${BACKEND_URL}/users/${id}`, {
    headers: {
      "Authorization": token,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchUsuarioByEmail = async (email, token) => {
  const response = await fetch(`${BACKEND_URL}/users?email=${email}`, {
    headers: {
      "Authorization": token,
    },
  });
  const data = await response.json();
  return data;
};

export const eliminarUsuario = async (id, confirmationPassword, token) => {
  const response = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      password: confirmationPassword,
    }),
  });

  return response;
};

export const actualizarUsuario = async (id, nombre, apellido, email, token) => {
  const response = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      name: nombre,
      lastname: apellido,
      email,
    }),
  });

  return response;
};

export const completarOnboarding = async (id, data, token) => {
  const response = await fetch(
    `${BACKEND_URL}/users/${id}/complete-onboarding`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(data),
    }
  );

  return response;
};
