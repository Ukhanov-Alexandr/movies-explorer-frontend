import { Link } from "react-router-dom";
import useFormValidations from "../hoocks/useFormValidations";
import { signinInitialValues } from "../../utils/constants";

export const Login = ({ onSignIn }) => {
  const { values, isErrors, errorMessages, handleValueChange, handleEmailValidation } =
    useFormValidations(signinInitialValues);

  function handleSubmit(e) {
    console.dir(e)
    e.preventDefault();
    onSignIn({
      email: values["input-email"],
      password: values["input-password"],
    });
  }

  return (
    <main className="main sign-form-container">
      <form action="/" name="register" className="sign-form" onSubmit={handleSubmit}>
        <div className="sign-form__fields-wrapper">
          <Link to="/" className="logo" aria-label="На главную" type="button" />
          <h1 className="sign-form__header">Рады видеть!</h1>
          <fieldset className="sign-form__fields">
            <label className="sign-form__label" htmlFor="email">
              <span className="sign-form__field-name">E-mail</span>
              <input
                className="sign-form__field"
                type="email"
                name="input-email"
                required
                placeholder="e-mail"
                value={values["input-email"]}
                onChange={handleEmailValidation}
              />
              <span className="sign-form__field-error">
                {errorMessages["input-email"]}
              </span>
            </label>

            <label className="sign-form__label" htmlFor="password">
              <span className="sign-form__field-name">Пароль</span>
              <input
                className="sign-form__field sign-form__field-password"
                type="password"
                name="input-password"
                required
                minLength={3}
                value={values["input-password"]}
                onChange={handleValueChange}
              />
              <span className="sign-form__field-error">
                {errorMessages["input-password"]}
              </span>
            </label>
          </fieldset>
        </div>

        <fieldset className="sign-form__fields">
          <button type="submit" className="button sign-form__button" disabled={Object.values(isErrors).some((item) => item)}>
            Войти
          </button>
          <p className="sign-form__subbutton-text">
            Уже зарегистрированы?{" "}
            <Link to="/sign-up" className="sign-form__subbutton-link">
              Регистрация
            </Link>
          </p>
        </fieldset>
      </form>
    </main>
  );
};
