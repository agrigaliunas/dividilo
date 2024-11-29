const BACKEND_URL = "http://localhost:5000/api";

export const fetchProjectsByUserId = async (userId, token) => {
  const data = await fetch(`${BACKEND_URL}/projects/user/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": token,
    },
  }).then((data) => data.json());
  return data;
};

export const fetchProjectById = async (projectId, token) => {
  const data = await fetch(`${BACKEND_URL}/projects/${projectId}`, {
    method: "GET",
    headers: {
      "Authorization": token,
    },
  }).then((data) => data.json());
  return data;
};

export const fetchUsersByProjectId = async (projectId, token) => {
  const data = await fetch(`${BACKEND_URL}/projects/${projectId}/users`, {
    method: "GET",
    headers: {
      "Authorization": token,
    },
  }).then((data) => data.json());
  return data;
};

export const createProject = async (nombre, descripcion, userId, token) => {
  const response = await fetch(`${BACKEND_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      title: nombre,
      description: descripcion,
      user_id: userId,
    }),
  });

  return response;
};

export const updateProject = async (id, nombre, descripcion, estado, token) => {
  const response = await fetch(`${BACKEND_URL}/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      title: nombre,
      description: descripcion,
      state: estado,
    }),
  });

  return response;
};

export const deleteProject = async (id, token) => {
  const response = await fetch(`${BACKEND_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });

  return response;
};

export const eliminarParticipanteDelProyecto = async (
  userFromId,
  id,
  participanteId,
  token
) => {
  const response = await fetch(`${BACKEND_URL}/projects/${id}/users`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      user_from_id: userFromId,
      userId: participanteId,
    }),
  });

  return response;
};

export const agregarParticipanteAlProyecto = async (
  userId,
  proyectoId,
  participanteEmail,
  token
) => {
  const response = await fetch(`${BACKEND_URL}/projects/${proyectoId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      user_from_id: userId,
      email: participanteEmail,
    }),
  });

  return response;
};
