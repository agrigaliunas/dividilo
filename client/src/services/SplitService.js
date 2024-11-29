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

export const addSplit = async (newSplit, ticketId, selectedSplitType, token) => {
  const data = await fetch(`${BACKEND_URL}/splits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      ticket_id: ticketId,
      user_id: newSplit.user_id,
      user_amount: newSplit.user_amount,
      split_type: selectedSplitType,
      user_percentage: newSplit.user_percentage || null
    }),
  }).then((data) => data.json());
  return data;
}


export const deleteSplit = async (splitId, token) => {
  const data = await fetch(`${BACKEND_URL}/splits/${splitId}`, {
    method: "DELETE",
    headers: {
      "Authorization": token,
    }
  }).then((data) => data.json());
  return data;
}
