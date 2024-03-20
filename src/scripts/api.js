
const baseUrl = "https://around.nomoreparties.co/v1/wff-cohort-8";
const headers = {
  authorization: "cb8b3077-1336-4493-90d8-81527940728d",
  "Content-Type": "application/json",
};

export function setUserInfo(username, about) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ name: username, about: about }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
}

export function getUserData() {
  return fetch(`${baseUrl}/users/me`, { headers })
    .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
}

export function setUserAvatar(avatarUrl) {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      avatar: avatarUrl
    }),
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function getInitialCards() {
  return fetch(`${baseUrl}/cards`, { headers })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function deleteCardFromServer(_id) {
  const token = localStorage.getItem('token'); 
  return fetch(`${baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

export function createCardOnServer(name, link) {
  const token = localStorage.getItem('token'); 
  return fetch(`${baseUrl}/cards`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function dislikeCard(_id) {
  return fetch(`${baseUrl}/cards/likes/${_id}`, {
    method: "DELETE",
    headers,
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function likeCard(_id) {
  return fetch(`${baseUrl}/cards/likes/${_id}`, {
    method: "PUT",
    headers: headers
  }).then(function (res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  });
}