const BACKEND_URL = "http://localhost:5000/api"

export const getExpensesByProjectId = async (projectId) => {
  const data = await fetch(`${BACKEND_URL}/expenses/project/${projectId}`).then(
    (data) => data.json()
  );
  return data;
};
