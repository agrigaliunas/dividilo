const BACKEND_URL = "http://localhost:5000/api"

export const fetchProjectsByUserId = async (userId) => {
  const data = await fetch(`${BACKEND_URL}/projects/user/${userId}`).then((data) =>
    data.json()
  );
  return data;
};


export const fetchProjectById = async (projectId) => {
  const data = await fetch(`${BACKEND_URL}/projects/${projectId}`).then((data) =>
    data.json()
  );
  return data;
};

export const fetchUsersByProjectId = async (projectId) => {
  const data = await fetch(`${BACKEND_URL}/projects/${projectId}/users`).then((data) =>
    data.json()
  );
  return data;
};

export const createProject = async (nombre, descripcion, userId, token) => {
  const response = await fetch(`${BACKEND_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      title: nombre,
      description: descripcion,
      user_id: userId
    }),
  });

  return response;
};

export const updateProject = async (id, nombre, descripcion, estado, token) => {
  const response = await fetch(
    `${BACKEND_URL}/projects/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        title: nombre,
        description: descripcion,
        state: estado
      })
    }
  );

  return response;
};


export const deleteProject = async (id) => {
  const response = await fetch(
    `${BACKEND_URL}/projects/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const eliminarParticipanteDelProyecto = async (id, participanteId) => {
    const response = await fetch(`${BACKEND_URL}/projects/${id}/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: participanteId,
      }),
    });

    return response;
    }


export const agregarParticipanteAlProyecto = async (proyectoId, participanteEmail) => {
  const response = await fetch(`${BACKEND_URL}/projects/${proyectoId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: participanteEmail
    }),
  });

  return response;
}
