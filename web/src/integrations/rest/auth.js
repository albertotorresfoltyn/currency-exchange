import { backendUri } from "../../config";
const API_URL = `${backendUri}/api/v1`;

const register = async ({ firstname, lastname, username, password }) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstname, lastname, username, password }),
  });
  const result = await response.json();
  return result;
};

const login = async ({ username, password }) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const result = await response.json();
  if (result.message) throw new Error(result.message);
  return {
    user: result.data.user,
    token: result.data.token,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, register };
