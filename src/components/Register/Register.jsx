import './Register.css';
import { Link } from 'react-router-dom';
import useFormValidations from "../hoocks/useFormValidations"
import { signupInitialValues } from "../../utils/constants"

export const Register = ({ onSignUp }) => {
  const {values, isErrors, errorMessages, handleValueChange } = useFormValidations(signupInitialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onSignUp({
      name: values["input-name"],
      email: values["input-email"],
      password: values["input-password"],
    });
  }

  return (
  <main className="main sign-form-container">
    <form action="/" name="register" className="sign-form" onSubmit={handleSubmit}>
      <div className="sign-form__fields-wrapper">
        <Link to="/" className="logo" aria-label="На главную" type="button" />
        <h1 className="sign-form__header">Добро пожаловать!</h1>
        <fieldset className="sign-form__fields">
          <label className="sign-form__label" htmlFor="name">
            <span className="sign-form__field-name">
              Имя
            </span>
            <input
              className="sign-form__field"
              type="text"
              name="input-name"
              minLength={3}
              required
              placeholder='Имя'
              value={values["input-name"]}
              onChange={handleValueChange}
            />
            <span className="sign-form__field-error">{errorMessages["input-name"]}</span>
          </label>

          <label className="sign-form__label" htmlFor="email">
            <span className="sign-form__field-name">
              E-mail
            </span>
            <input
              className="sign-form__field"
              type="email"
              name="input-email"
              required
              placeholder='e-mail'
              value={values["input-email"]}
              onChange={handleValueChange}
            />
            <span className="sign-form__field-error">{errorMessages["input-email"]}</span>
          </label>

          <label className="sign-form__label" htmlFor="password">
            <span className="sign-form__field-name">
              Пароль
            </span>
            <input
              className="sign-form__field sign-form__field-password"
              type="password"
              name="input-password"
              required
              minLength={3}
              value={values["input-password"]}
              onChange={handleValueChange}
            />
            <span className="sign-form__field-error">{errorMessages["input-password"]}</span>
          </label>
        </fieldset>
      </div>

      <fieldset className="sign-form__fields">
        <button
          type="submit"
          className="button sign-form__button"
          disabled={Object.values(isErrors).some((item) => item)}
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
)};
