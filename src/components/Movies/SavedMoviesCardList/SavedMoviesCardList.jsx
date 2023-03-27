import "./SavedMoviesCardList.css";
import React, { useState } from "react";
import { Preloader } from "../Preloader/Preloader";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export const SavedMoviesCardList = ({ movies, isShort }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(16);

  const loadMore = () => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      setIndex(index + 8);
      setIsLoading(false);
    }, 800);
  };
  console.log(movies.movies)

  const moviesElements = movies.movies;
  const isEmpty = movies.length === 0;
  const hasCards = !isEmpty;
  return (
    <article className="article movies" aria-label="Все роллы">
      {hasCards && (
        <>
          <ul className="cards">
            {isShort
              ? moviesElements.map((movie) => (
                  <MoviesCard key={movie.id} movie={movie}/>
                ))
              : moviesElements.map((movie) => (
                  <MoviesCard key={movie.id} movie={movie}/>
                ))}
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
