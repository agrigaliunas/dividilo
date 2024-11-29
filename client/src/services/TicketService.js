const BACKEND_URL = "http://localhost:5000/api";

export const getTicketsByExpenseId = async (expenseId, token) => {
  const data = await fetch(`${BACKEND_URL}/tickets/expense/${expenseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": token,
    },
  }).then((data) => data.json());
  return data;
};

export const addTicket = async (
  expenseId,
  description,
  ticketAmount,
  ticketDate,
  formData,
  token
) => {
  const data = await fetch(`${BACKEND_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      description: description,
      amount: ticketAmount,
      ticket_date: ticketDate,
      expense_id: expenseId,
    }),
  }).then((data) => data.json());

  return data;
};

export const uploadTicketImage = async (ticketId, formData, token) => {
  const url = await fetch(`${BACKEND_URL}/tickets/${ticketId}/images`, {
    method: "POST",
    headers: {
      "Authorization": token,
    },
    body: formData,
  });

  return url
}


export const deleteTicket = async (id) => {
  const response = await fetch(
    `${BACKEND_URL}/tickets/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};