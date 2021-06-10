import { apiFetch, BASE_URL } from "./api_fetch.js";

export const signup = (email, password) => 
  apiFetch(`${BASE_URL}/signup`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  body: JSON.stringify({email,password}),
});

