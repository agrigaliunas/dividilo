const BACKEND_URL = "http://localhost:5000/api";

export const getExpensesByProjectId = async (projectId, token) => {
  const data = await fetch(`${BACKEND_URL}/expenses/project/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  }).then((data) => data.json());
  return data;
};

export const getExpensesWithTicketsByProjectId = async (projectId, token) => {
  const data = await fetch(`${BACKEND_URL}/expenses/project/${projectId}/expenses-with-tickets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  }).then((data) => data.json());
  return data;
};

export const addExpense = async (projectId, userId, expenseTitle, token) => {
  const data = await fetch(`${BACKEND_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      user_from_id: userId,
      title: expenseTitle,
      project_id: projectId
    }),
  }).then((data) => data.json());
  return data;
};

export const updateExpense = async (id, newExpenseTitle) => {
  const response = await fetch(
    `${BACKEND_URL}/expenses/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": token
      },
      body: JSON.stringify({
        title: newExpenseTitle,
      })
    }
  );

  return response;
};
