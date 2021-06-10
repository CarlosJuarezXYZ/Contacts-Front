import { BASE_URL, apiFetch  } from "./api_fetch.js";

export const listContacts = () => {
  return apiFetch(`${BASE_URL}/contacts`, {
    method: "GET",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`,
    },
  });
}

export const createContacts = (name,email,number,relation,urlImage,gender,birthday) => {
  return apiFetch(`${BASE_URL}/contacts`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({name, email, number, relation,urlImage,gender,birthday}),
  })
};

export const showContacts = (contactId) => {
  return apiFetch(`${BASE_URL}/contacts/${contactId}`,{
      method: "GET",
      headers: {
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      },
  })
};

export const editContacts = (contactId,name,email,number,relation,urlImage,gender,birthday) => {
  return apiFetch(`${BASE_URL}/contacts/${contactId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({name, email, number, relation,urlImage,gender,birthday}),
  })
};


export const editFavoriteContacts = (contactId, favorite) => {
  return apiFetch(`${BASE_URL}/contacts/${contactId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({favorite}),
  })
};

export const deleteContacts = (contactId) => {
  return apiFetch(`${BASE_URL}/contacts/${contactId}`,{
      method: "DELETE",
      headers: {
          Authorization: `Token token=${sessionStorage.getItem("token")}`,
      }
  })
};
