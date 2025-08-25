import { BASE_URL } from "./constants";
// const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

const getItems = () => {
  return fetch(`${BASE_URL}/items`).then(checkResponse);
};

const postItems = (name, image, weatherType, token) => {
  //use localStorage.getToken() in app.jsx  to get token just before calling this function
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      name,
      imageUrl: image,
      weather: weatherType,
    }),
  }).then(checkResponse);
};

const getClothItem = (itemId, token) => {
  //use localStorage.getToken() in app.jsx  to get token just before calling this function
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const deleteCard = (selectedCard, token) => {
  return fetch(`${BASE_URL}/items/${selectedCard._id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export { getItems, postItems, deleteCard, getClothItem, checkResponse };
