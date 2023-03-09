import './MoviesCardList.css';
import React, { useState } from "react";
import { Preloader } from '../Preloader/Preloader';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { defaultCards } from '../../../utils/constants';

export const MoviesCardList = ({ cards = defaultCards }) => {
  const [ isLoading, setIsLoading ] = useState(false);

  const loadMore = () => {
    setIsLoading(true)
  };

  const isEmpty = (cards.length === 0);
  const hasCards = !isEmpty;

  return (
    <article className="article movies" aria-label="Все роллы">
      {hasCards && (
      <>
        <ul className="cards">
          {cards.map((card) => <MoviesCard key={card.id} card={card}/>)}
        </ul>
        <button
          type="button"
          className="animation button movies__more"
          disabled={isLoading}
          onClick={loadMore}
        >
          Ещё
        </button>
      </>
      )}
      {isLoading && (
      <>
        <Preloader />
        <p className="movies__load-info">Загрузка...</p>
      </>
      )}
      {isEmpty && <p className="movies__load-info">Ничего не найдено</p>}
    </article>
  );
};