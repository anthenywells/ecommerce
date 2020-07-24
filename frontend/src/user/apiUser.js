import { API } from "../config";

export const read = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("read -> err", err);
    });
};

export const update = (userId, token, user) => {
  return fetch(`${API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log("res", res);
      return res.json();
    })
    .catch((err) => {
      console.log("update -> err", err);
    });
};

export const updateUser = (user, next) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("jwt")) {
      let auth = localStorage.getItem("jwt");
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};
