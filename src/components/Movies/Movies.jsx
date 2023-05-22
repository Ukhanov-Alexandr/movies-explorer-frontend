import "./Movies.css";
import React, { useState, useEffect } from "react";
import { Preloader } from "../Movies/Preloader/Preloader";
import { SearchForm } from "./SearchForm/SearchForm";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";

export const Movies = ({ movies, onSearchClick, handleHeardClick, savedMovies, setSavedMovies }) => {
  const [word, setWord] = useState((localStorage.getItem("word")?localStorage.getItem("word"):""));
  const [isLoading, setIsLoading] = useState(false);
  const [isShort, setIsShort] = useState(localStorage.getItem("isShort")?(JSON.parse((localStorage.getItem("isShort"))) === true):false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handlSearch = () => {
    const moviesSearch = [];
      movies.forEach((movie) => {
        // eslint-disable-next-line eqeqeq
        if (word.length != 0 && movie.nameRU.toLowerCase().includes(word.toLowerCase())) {
          moviesSearch.push(movie);
          localStorage.setItem("word", word);
        }
      });
    return moviesSearch;
  };

  useEffect(() => {
      onSearchClick()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <main className="main">
      <SearchForm
        setWord={setWord}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setIsShort={setIsShort}
        isShort={isShort}
        setIsFirstRender={setIsFirstRender}
        onSearchClick={onSearchClick}
      />
      {isLoading ? (
        <>
          <Preloader />
          <p className="movies__load-info">Загрузка...</p>
        </>
      ) : (
        <MoviesCardList
          movies={handlSearch()}
          isShort={(localStorage.getItem("isShort") === "true")}
          handleHeardClick={handleHeardClick}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          isFirstRender={isFirstRender}
        />
      )}
    </main>
  );
};
