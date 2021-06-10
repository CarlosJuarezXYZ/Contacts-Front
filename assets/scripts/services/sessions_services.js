import { apiFetch, BASE_URL } from "./api_fetch.js";

export const login = (email, password) =>
  apiFetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

export const logout = () =>
  apiFetch(`${BASE_URL}/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`,
    },
});