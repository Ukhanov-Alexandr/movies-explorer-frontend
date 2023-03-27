import { useState } from "react";

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

  return {values, isErrors, errorMessages, handleValueChange, setValues, resetErrors};
}

export default useFormValidations;
