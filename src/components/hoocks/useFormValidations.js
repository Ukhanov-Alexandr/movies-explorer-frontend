import { useState } from "react";

const isValidEmail = email =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

function useFormValidations(initialValues) {
  const {inputValues, errorValues, errorStates} = initialValues;
  const [values, setValues] = useState(inputValues);
  const [errorMessages, setErrorMessages] = useState(errorValues);
  const [isErrors, setIsErrors] = useState(errorStates);

  const handleValueChange = (evt) => {
    const {
      target: {
        value,
        validationMessage,
        name,
        validity: { valid },
      },
    } = evt;
    setValues({ ...values, [name]: value });
    setIsErrors({ ...isErrors, [name]: !valid });
    if (!valid) {
      setErrorMessages({ ...errorMessages, [name]: validationMessage });
    } else {
      setErrorMessages({ ...errorMessages, [name]: "" });
    }
  };

  function resetErrors() {
    setIsErrors(errorStates);
    setErrorMessages(errorValues);
  }

  const handleEmailValidation = (evt) => {
    const {
      target: {
        value,
        name,
      },
    } = evt;
    const isEmailValid = isValidEmail(value);

    setValues({ ...values, [name]: value });
    setIsErrors({ ...isErrors, [name]: !isEmailValid });
    if (!isEmailValid) {
      setErrorMessages({ ...errorMessages, [name]: 'некорректный email' });
    } else {
      setErrorMessages({ ...errorMessages, [name]: "" });
    }
  };

  return {values, isErrors, errorMessages, handleValueChange, setValues, resetErrors, handleEmailValidation};
}

export default useFormValidations;
