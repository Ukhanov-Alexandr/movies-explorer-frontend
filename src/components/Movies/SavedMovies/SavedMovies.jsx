import "./SavedMovies.css";
import React, { useState } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { Preloader } from "../Preloader/Preloader";

export const SavedMovies = ({movies, onSearchClick, handleHeardClick}) => {
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShort, setIsShort] = useState(false);

  // const handlSearch = () => {
  //   const moviesSearch = [];
  //   movies.forEach((movie) => {
  //     if (movie.nameRU.toLowerCase().includes(word.toLowerCase())) {
  //       moviesSearch.push(movie);
  //     }
  //   });
  //   return moviesSearch;
  // };

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
      <MoviesCardList
          movies={movies}
          isShort={isShort}
          handleHeardClick={handleHeardClick}
        />
    </main>
  );
};

