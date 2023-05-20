import "./SavedMovies.css";
import React, { useState, useEffect, useCallback } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { Preloader } from "../Preloader/Preloader";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export const SavedMovies = ({movies, onSearchClick, handleHeardClick, savedMovies, setSavedMovies }) => {
  const [word, setWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShort, setIsShort] = useState(false);
  
  const handlSearch = () => {
    const moviesSearch = [];
    movies.forEach((movie) => {
      if (word.length != 0 && movie.nameRU.toLowerCase().includes(word.toLowerCase())) {
        moviesSearch.push(movie);
      }
    });
    return moviesSearch;
  };

  const [searchSavedMovies, satSearchSavedMovies] = useState( word.length == 0 ? movies : handlSearch() );
  
  // useEffect(() => {
  //   // onSearchClick()
  //   console.log(word.length == 0)
  //   console.log(searchSavedMovies)
  // },[]);

  useEffect(() => {
    satSearchSavedMovies(handlSearch())
  },[movies]);

  return (
    <main className="main">
      <SearchForm
        onSearchClick={onSearchClick}
        setWord={setWord}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setIsShort={setIsShort}
        isShort={isShort}
        handlSearch={handlSearch}
      />
      {isLoading ? (
        <>
          <Preloader />
          <p className="movies__load-info">Загрузка...</p>
        </>
      ) : (
        <MoviesCardList
          movies={ word ? handlSearch() : movies}
          isShort={isShort}
          handleHeardClick={handleHeardClick}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
        />
      )}
    </main>
  );
};

