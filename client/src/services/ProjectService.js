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

export const createProject = async (nombre, descripcion, userId) => {
  const response = await fetch(`${BACKEND_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: nombre,
      description: descripcion,
      user_id: userId
    }),
  });

  return response;
};

export const updateProject = async (proyectoActualizado) => {
  const response = await fetch(
    `http://localhost:8000/proyectos/${proyectoActualizado.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proyectoActualizado),
    }
  );

  return response;
};


export const deleteProject = async (id) => {
  const response = await fetch(
    `http://localhost:8000/proyectos/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const eliminarParticipanteDelProyecto = async (proyectoId, participanteId) => {
  const proyecto = await fetch(`http://localhost:8000/proyectos/${proyectoId}`).then((res) => res.json());

  const participantesActualizados = proyecto.participantes.filter(id => id !== participanteId);

  const response = await fetch(`http://localhost:8000/proyectos/${proyectoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...proyecto, 
      participantes: participantesActualizados 
    }),
  });

  return response;
};
