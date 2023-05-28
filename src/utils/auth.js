export const BASE_URL = "https://api.movies.ukh.nomoredomains.club";
// export const BASE_URL = "http://localhost:3001";

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data) {
        console.log(data.token)
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
};