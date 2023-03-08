import './Register.css';
import { Link } from 'react-router-dom';

export const Register = () => (
  <main className="main sign-form-container">
    <form action="/" name="register" className="sign-form">
      <div className="sign-form__fields-wrapper">
        <Link to="/" className="logo" aria-label="На главную" type="button" />
        <h1 className="sign-form__header">Добро пожаловать!</h1>
        <fieldset className="sign-form__fields">
          <label className="sign-form__label" htmlFor="name">
            <span className="sign-form__field-name">
              Имя
            </span>
            <input
              type="text"
              name="name"
              id="name"
              className="sign-form__field"
              minLength={3}
              required
              placeholder='Виталий'
            />
            <span
              className="sign-form__field-error"
            >
            </span>
          </label>

          <label className="sign-form__label" htmlFor="email">
            <span className="sign-form__field-name">
              E-mail
            </span>
            <input
              type="email"
              name="email"
              id="email"
              className="sign-form__field"
              required
              placeholder='pochta@yandex.ru'
            />
            <span className="sign-form__field-error"/>
          </label>

          <label className="sign-form__label" htmlFor="password">
            <span className="sign-form__field-name">
              Пароль
            </span>
            <input
              type="password"
              name="password"
              id="password"
              className="sign-form__field sign-form__field-password"
              required
            />
            <span className="sign-form__field-error">Что-то пошло не так ...
            </span>
          </label>
        </fieldset>
      </div>

      <fieldset className="sign-form__fields">
        <button
          type="submit"
          className="button sign-form__button"
        >
          Зарегистрироваться
        </button>
        <p className="sign-form__subbutton-text">
          Уже зарегистрированы?
          {' '}
          <Link
            to="/sign-in"
            className="sign-form__subbutton-link"
          >
            Войти
          </Link>
        </p>
      </fieldset>
    </form>
  </main>
);