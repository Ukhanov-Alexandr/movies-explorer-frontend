import "./Movies.css";
import React, { useState } from "react";
import { Preloader } from "../Movies/Preloader/Preloader";
import { SearchForm } from "./SearchForm/SearchForm";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";

export const Movies = ({ movies, onSearchClick, handleHeardClick }) => {
  const [word, setWord] = useState(localStorage.getItem("word"));
  const [isLoading, setIsLoading] = useState(false);
  const [isShort, setIsShort] = useState(false);

  const handlSearch = () => {
    const moviesSearch = [];
      movies.forEach((movie) => {
        if (movie.nameRU.toLowerCase().includes(word.toLowerCase())) {
          moviesSearch.push(movie);
          localStorage.setItem("word", word);
        }
      });
    return moviesSearch;
  };

  console.log(localStorage.getItem("word"))
  // console.log(localStorage.getItem("isShort"))

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
          isShort={(localStorage.getItem("isShort") == "true")}
          handleHeardClick={handleHeardClick}
        />
      )}
    </main>
  );
};
