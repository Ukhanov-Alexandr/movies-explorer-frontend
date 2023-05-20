import "./MoviesCardList.css";
import React, { useState } from "react";
import { Preloader } from "../Preloader/Preloader";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export const MoviesCardList = ({
  movies,
  handleHeardClick,
  isShort,
  savedMovies,
  setSavedMovies,
  isFirstRender,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(16);
  const { pathname } = useLocation();
  // const [isNoMore, setIsNoMore] = useState(true);

  const loadMore = () => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      setIndex(index + 8);
      setIsLoading(false);
    }, 800);
  };

  const handlShort = (movies) => {
    const moviesShort = [];
    movies.forEach((movie) => {
      if (movie.duration <= 40) {
        moviesShort.push(movie);
      }
    });
    return moviesShort;
  };

  const moviesElements =
    pathname === "/movies" ? movies.slice(0, index) : movies;
  const isEmpty = movies.length === 0;
  const hasCards = !isEmpty;
  return (
    <article className="article movies" aria-label="Все роллы">
      {hasCards && (
        <>
          <ul className="cards">
            {(isShort ? handlShort(moviesElements) : moviesElements).map(
              (movie) => (
                <MoviesCard
                  key={pathname === "/movies" ? movie.id : movie._id}
                  movie={movie}
                  handleHeardClick={handleHeardClick}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              )
            )}
          </ul>

          { moviesElements.length == index && (
            <button
              type="button"
              className={
                pathname === "/movies"
                  ? "animation button movies__more"
                  : "movies__more_hidden"
              }
              disabled={isLoading}
              onClick={loadMore}
            >
              Ещё
            </button>
          )}
        </>
      )}
      { isLoading && (
        <>
          <Preloader />
          <p className="movies__load-info">Загрузка...</p>
        </>
      )}
      {isEmpty && !isFirstRender && (
        <p className="movies__load-info">Ничего не найдено</p>
      )}
    </article>
  );
};
