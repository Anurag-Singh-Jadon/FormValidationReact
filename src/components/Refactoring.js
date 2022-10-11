import { useState, useEffect } from "react";

const Refactoring = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const[formIsValid, setFormIsValid] = useState(false)
  const enteredNameIsValid = enteredName.trim() !== ""; 
  const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;

  useEffect(()=>{
      if(enteredNameIsValid){
        setFormIsValid(true)
      }else{
        setFormIsValid(false)
      }
  },[enteredNameIsValid])
  const nameInputChangeHandler = (event) => {
    //Here event object are default
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const formSubmissionHandler = (event) => {
    //Here preventDefault() means to not do the default behaviour, to not send default value
    event.preventDefault();
    setEnteredNameTouched(true);
    if (!enteredNameIsValid) {
      return;
    }
    console.log(enteredName);

    //Here down we can see the use of Ref , how it works

    //nameInputRef.current.value=''; => Not ideal don't manipulate
    setEnteredName("");
    setEnteredNameTouched(false)
  };

  //Here is a way of dynamic design
  const nameInputClasses = nameInputIsValid
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsValid && (
          <p className="error-text"> Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default Refactoring;
