import "./Profile.css";
import React, { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidations from "../hoocks/useFormValidations";
import { signupInitialValues } from "../../utils/constants";

export const Profile = ({ onUpdateUser, signOut }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    values,
    isErrors,
    errorMessages,
    handleValueChange,
    setValues,
    resetErrors,
    handleEmailValidation
  } = useFormValidations(signupInitialValues);

  useEffect(() => {
    if (!!currentUser.name && !!currentUser.email) {
      setValues({
        "input-name": currentUser.name,
        "input-email": currentUser.email,
      });
      resetErrors();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.name, currentUser.email]);

  function handleSubmit(e){
    e.preventDefault();
    console.log('hey!')
    // eslint-disable-next-line eqeqeq
    if (currentUser.name == values["input-name"] && currentUser.email == values["input-email"]) {
      console.log('ничего не поменялость')
    } else {
      onUpdateUser({
        name: values["input-name"],
        email: values["input-email"]
    });
    }
  }

  return (
    <main className="main profile-form-container">
      <form action="/" name="edit" className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-form__fields-wrapper">
          <h1 className="profile-form__header">Привет, {currentUser.name}!</h1>
          <fieldset className="profile-form__fields">
            <label className="profile-form__label">
              <span className="profile-form__field-name">Имя</span>
              <input
                className="profile-form__field"
                type="text"
                name="input-name"
                value={values["input-name"]}
                minLength={3}
                maxLength={30}
                required
                onChange={handleValueChange}
              />
            </label>
            <span className="sign-form__field-error">
              {errorMessages["input-name"]}
            </span>
            <label
              className="profile-form__label profile-form__label_borderless"
            >
              <span className="profile-form__field-name">E&#8209;mail</span>
              <input
                className="profile-form__field"
                type="email"
                name="input-email"
                value={values["input-email"]}
                required
                onChange={handleEmailValidation}
              />
            </label>
            <span className="sign-form__field-error">
              {errorMessages["input-email"]}
            </span>
          </fieldset>
        </div>
        <fieldset className="profile-form__fields profile-form__fields_flex">
          <span className="profile-form__field-error" />
          <button
            type="submit"
            className="animation button profile-form__button profile-form__button_action_edit"
            disabled={Object.values(isErrors).some((item) => item)}
          >
            Редактировать
          </button>
          <button
            className="animation button profile-form__button profile-form__button_action_logout"
            type="button"
            onClick={signOut}
          >
            Выйти из аккаунта
          </button>
        </fieldset>
      </form>
    </main>
  );
};
