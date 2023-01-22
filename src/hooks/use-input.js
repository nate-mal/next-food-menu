import { useState } from "react";

const useInput = (validation) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validation(value);
  const isInvalid = isTouched && !isValid;

  const changeInputValue = (event) => {
    setValue(event.target.value);
  };
  const touchInputValue = () => {
    setIsTouched(true);
  };
  return { value, isValid, isInvalid, changeInputValue, touchInputValue };
};

export default useInput;
