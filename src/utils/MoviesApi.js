const apiConfig = {
    url: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
      'Content-Type': 'application/json',
    }
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
  
    getMovies() {
      return fetch(`${this._url}`, {
        method: "GET",
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }

  }
  
  const MoviesApi = new Api(apiConfig);
  
  export default MoviesApi;
  