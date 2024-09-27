export const fetchProjects = async () => {
  const data = await fetch("http://localhost:8000/proyectos").then((data) =>
    data.json()
  );
  return data;
};

export const createProject = async (nombre, descripcion, usuariosId) => {
  const response = await fetch(`http://localhost:8000/proyectos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      descripcion: descripcion,
      participantes: usuariosId,
      montoTotalProyecto: 0,
      gastos: [],
      estado: "En progreso",
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
