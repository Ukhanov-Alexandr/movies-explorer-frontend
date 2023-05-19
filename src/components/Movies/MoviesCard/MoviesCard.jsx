import "./MoviesCard.css";
import React, { useState, useEffect, useCallback, useReducer  } from "react";
import { useLocation } from "react-router-dom";
import MainApi from "../../../utils/MainApi";
// import { CurrentUserContext } from "../../../contexts/CurrentUserContext";


export const MoviesCard = ({ movie, handleHeardClick, savedMovies, setSavedMovies }) => {
  // const currentUser = React.useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = useState(false);
  const { pathname } = useLocation();

  const check = (arr) => {
    let isliked = false;
    arr.forEach((i) => {
      if (i.movieId == movie.id) {
        isliked = true;
        return isliked;
      }
    });
    return isliked;
  };

  const handler = () => {
    handleHeardClick(movie, savedMovies, setSavedMovies, isSaved, setIsSaved);
  };

  useEffect(() => {
    setIsSaved(check(savedMovies));
  }, []);

  const duration = () => {
    let duration = movie.duration;
    if (movie.duration >= 60) {
      duration =
        ((movie.duration / 60) | 0) + " ч " + (movie.duration % 60) + " мин";
    } else {
      return (duration = (movie.duration % 60) + " мин");
    }
    return duration;
  };

  return (
    <li className="cards__item">
      <section className="card">
        <a target="_blank" href={movie.trailerLink}>
          <img
            className="card__image"
            src={
              pathname === "/movies"
                ? `${"https://api.nomoreparties.co/"}${movie.image.url}`
                : movie.image
            }
            alt={movie.name}
          />
        </a>
        <div className="card__content">
          <div className="card__info">
            <h2 className="card__name">{movie.nameRU}</h2>
            <button
              type="button"
              className={
                pathname === "/saved-movies"
                  ? "animation button card__button card__button-delete"
                  : isSaved
                  ? "animation button card__button card__button-saved"
                  : "animation button card__button"
              }
              aria-label="Избранное"
              onClick={handler}
            />
          </div>
          <hr className="card-delimiter" />
          <p className="card__duration">{duration()}</p>
        </div>
      </section>
    </li>
  );
};
