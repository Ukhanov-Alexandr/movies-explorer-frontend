import './SearchForm.css';

export const SearchForm = () => (
  <article className="article search" aria-label="Поиск фильмов">
    <form action="/" name="search" className="search-form">
      <fieldset className="search__fields search__fields_type_film">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          id="film"
          name="film"
          minLength={3}
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