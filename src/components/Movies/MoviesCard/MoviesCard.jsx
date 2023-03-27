import "./MoviesCard.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MainApi from "../../../utils/MainApi";

export const MoviesCard = ({ movie, handleHeardClick}) => {
  const [isSaved, setIsSaved] = useState(false);
  const { pathname } = useLocation();

  const handler = () => {
    // console.log(movie)
    // console.log(movie.id)
    // console.log(movie._id)
    setIsSaved(!isSaved);
    handleHeardClick(movie);
  };

  const duration = () => {
    let duration = movie.duration;
    if (movie.duration >= 60) {
      duration = ((movie.duration / 60) | 0) + " ч " + (movie.duration % 60) + " мин";
    } else {
      return duration = ((movie.duration % 60) + " мин");
    }
    return duration;
  };

  return (
    <li className="cards__item">
      <section className="card">
        <img
          className="card__image"
          src={(pathname === "/movies") ? `${"https://api.nomoreparties.co/"}${movie.image.url}` : movie.image}
          alt={movie.name}
        />
        <div className="card__content">
          <div className="card__info">
            <h2 className="card__name">{movie.nameRU}</h2>
            <button
              type="button"
              className={
                isSaved
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
