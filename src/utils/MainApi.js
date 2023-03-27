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

  patchProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
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
      .then((data) => data);
  }

  getMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  createMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
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

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

const MainApi = new Api(apiConfig);

export default MainApi;
