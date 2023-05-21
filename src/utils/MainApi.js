const apiConfig = {
  url: "https://api.movies.ukh.nomoredomains.club",
  // url: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
};

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  async _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const errorCode = res.status;
    const err = await res.json();
    err.errorCode = errorCode;
    return Promise.reject(err);
  }

  patchProfile(data, jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getUser(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return [];
      })
      .then((data) => {
        return data});
  }

  getMovies(jwt) {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  createMovie(movie, jwt) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${"https://api.nomoreparties.co/"}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${"https://api.nomoreparties.co/"}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(movieId, jwt) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._checkResponse(res));
  }
}

const MainApi = new Api(apiConfig);

export default MainApi;
