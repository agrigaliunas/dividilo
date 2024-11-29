const BACKEND_URL = "http://localhost:5000/api";

export const eliminarSplitsDelParticipante = async (
  userId,
  projectId,
  token
) => {
  const response = await fetch(
    `${BACKEND_URL}/splits/${projectId}/user/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    }
  );
  return response;
};
