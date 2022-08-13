import {useReducer } from "react";

//custom hook
const useInput = (validateValue) => {

  const initialInputState = {
    value: "",
    isTouched: false,
  };

  const inputStateReducer = (state, action) => {
    if (action.type == "INPUT") {
      return { value: action.value, isTouched: state.isTouched };
    }
    if (action.type == "BLUR") {
      return { value: state.value, isTouched: true };
    }
    if (action.type == "RESET") {
      return { value: "", isTouched: false };
    }
    return inputStateReducer;
  };

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value); //can be derived from enteredState and enteredNameTouched (states that we have)
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value })
  };
    
  const inputBlurHandler = (event) => {
    //when lost focus
    dispatch({ type: "BLUR" });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError, 
    valueChangeHandler,
    inputBlurHandler,
    reset, //functions can be called from the components that use this hook
  };
}

export default useInput;
