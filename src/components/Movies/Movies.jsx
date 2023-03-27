import "./Movies.css";
import React, { useState } from "react";
import { Preloader } from "../Movies/Preloader/Preloader";
import { SearchForm } from "./SearchForm/SearchForm";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";

export const Movies = ({ movies, onSearchClick, handleHeardClick }) => {
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShort, setIsShort] = useState(false);

  const handlSearch = () => {
    const moviesSearch = [];
    movies.forEach((movie) => {
      if (movie.nameRU.toLowerCase().includes(word.toLowerCase())) {
        moviesSearch.push(movie);
      }
    });
    return moviesSearch;
  };

  return (
    <main className="main">
      <SearchForm
        onSearchClick={onSearchClick}
        setWord={setWord}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setIsShort={setIsShort}
        isShort={isShort}
      />
      {isLoading ? (
        <>
          <Preloader />
          <p className="movies__load-info">Загрузка...</p>
        </>
      ) : (
        <MoviesCardList
          movies={handlSearch()}
          isShort={isShort}
          handleHeardClick={handleHeardClick}
        />
      )}
    </main>
  );
};
