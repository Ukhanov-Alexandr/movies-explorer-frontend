import './MoviesCard.css';
import React, { useState } from "react";

export const MoviesCard = ({ card = {} }) => {
  const [ isSaved, setIsSaved ] = useState(false);

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <li className="cards__item">
      <section className="card">
      <img className="card__image" src={card.cover} alt={card.name} />
        <div className="card__content">
          <div className="card__info">
            <h2 className="card__name">{card.name}</h2>
            <button
              type="button"
              className={isSaved ? "animation button card__button card__button-saved" : "animation button card__button"}
              aria-label="Избранное"
              onClick={handleSaveClick}
            />
          </div>
            <hr className="card-delimiter" />
            <p className="card__duration">{card.duration}</p>
        </div>
      </section>
    </li>
  );
};