import './SearchForm.css';
import React, { useState, useEffect } from "react";

export const SearchForm = ({onSearchClick, setWord, isLoading, setIsLoading, isShort, setIsShort}) => {
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
   setChecked((JSON.parse((localStorage.getItem("isShort"))) === true))
  }, []);

  function handleSubmit(e){
    e.preventDefault();
    setWord(e.target[1].value);
    setIsLoading(!isLoading);
    onSearchClick();
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }

  function handleShort(evt){
    localStorage.setItem("isShort", !isShort);
    setIsShort(!isShort)
    setChecked((JSON.parse((localStorage.getItem("isShort"))) === true))
    // setChecked(!checked);
    // setChecked(evt.target.checked)
    // console.log(!checked)
    // console.log(evt.target.checked)
    // console.log(localStorage.getItem("isShort"))
  }

  // function handleChange() {
	// 	setChecked(!checked);
	// }

  // console.log(isShort)
  // console.log(checked)
  // console.log(JSON.parse((localStorage.getItem("isShort"))) === true)

  return(
    <article className="article search" aria-label="Поиск фильмов">
      <form action="/" name="search" className="search-form" onSubmit={handleSubmit}>
        <fieldset className="search__fields search__fields_type_film">
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            name="film"
            required
          />
          <button
            className="animation button search-form__button"
            type="submit"
            aria-label="Найти"
          />
        </fieldset>
      </form>
      <fieldset className="search__fields">
          <div className="shorts-switch">
            <input
              // className={(localStorage.getItem("isShort") == "true") ? "shorts-switch__checkbox shorts-switch__checkbox_active" : "shorts-switch__checkbox"}
              className="shorts-switch__checkbox"
              type="checkbox"
              id="shorts"
              name="shorts"
              // onClick={handleShort}
              onChange={handleShort}
              // checked={isShort}
              checked={checked}
            />
            <label className="shorts-switch__label" htmlFor="shorts" />
            <label className="shorts-switch__text" htmlFor="shorts">
              Короткометражки
            </label>
          </div>
        </fieldset>
      <hr className="search-delimiter" />
    </article>
  );
}