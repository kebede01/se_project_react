const baseUrl = "http://localhost:3001";
const getItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

const postItems = (name, image, weatherType) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name,
      imageUrl: image,
      weather: weatherType,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

const deleteCard = (selectedCard) => {
  return fetch(`${baseUrl}/items/${selectedCard._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export { getItems, postItems, deleteCard };
