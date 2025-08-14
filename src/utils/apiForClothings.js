// Specify the BASE_URL for the API.
export const BASE_URL = "http://localhost:3001";
 export const addCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/:itemId/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      id,
     
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

 export const removeCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/:itemId/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      id,
     
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

// 