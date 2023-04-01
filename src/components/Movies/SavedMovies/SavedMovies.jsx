import "./SavedMovies.css";
import React, { useState } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export const SavedMovies = ({movies, onSearchClick, handleHeardClick}) => {
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShort, setIsShort] = useState(false);

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

