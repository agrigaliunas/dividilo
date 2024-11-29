const BACKEND_URL = "http://localhost:5000/api";

export const fetchNotificationsByUserId = async (userId, token) => {
  const data = await fetch(`${BACKEND_URL}/notifications/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": token,
    },
  }).then((data) => data.json());
  return data;
};