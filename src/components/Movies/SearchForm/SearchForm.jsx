import './SearchForm.css';

export const SearchForm = ({setWord, isLoading, setIsLoading, isShort, setIsShort}) => {

  function handleSubmit(e){
    
    e.preventDefault();
    setWord(e.target[1].value);
    setIsLoading(!isLoading);
    console.log('11')
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }

  function handleShort(evt){
    localStorage.setItem("isShort", !isShort);
    setIsShort(!isShort)
  }

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
              className="shorts-switch__checkbox"
              type="checkbox"
              id="shorts"
              name="shorts"
              onChange={handleShort}
              checked={isShort}
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