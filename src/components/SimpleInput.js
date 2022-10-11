import { useRef,useState,useEffect } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef()
  const [enteredName,setEnteredName] = useState('')
  //Validation For name
  const[enteredNameISValid,setEnteredNameIsValid] = useState(false)
  const [enteredNameTouched, setEnteredNameTouched] = useState(false)

  useEffect(()=>{
    if(enteredNameISValid){
      console.log('Name input is Valid!');
    }
  },[enteredNameISValid])

  const nameInputChangeHandler = event=>{
//Here event object are default
 setEnteredName(event.target.value);
 if(event.target.value.trim() !== ''){
  setEnteredNameIsValid(true)
}
  }
  const nameInputBlurHandler = event =>{
    setEnteredNameTouched(true);
    if(enteredName.trim() === ''){
      setEnteredNameIsValid(false)
    }
  }
  const formSubmissionHandler = event =>{
    //Here preventDefault() means to not do the default behaviour, to not send default value
    event.preventDefault();
    setEnteredNameTouched(true)
    if(enteredName.trim() === ''){
      setEnteredNameIsValid(false)
      return;
    }
    setEnteredNameIsValid(true)
     console.log(enteredName)

     //Here down we can see the use of Ref , how it works
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue)
    //nameInputRef.current.value=''; => Not ideal don't manipulate
    setEnteredName('')
  }
  const nameInputIsValid = !enteredNameISValid && enteredNameTouched; 

  //Here is a way of dynamic design
  const nameInputClasses = nameInputIsValid ?'form-control invalid' : 'form-control'
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        ref={nameInputRef}
        type='text' 
        id='name' 
        onChange={nameInputChangeHandler} 
        onBlur={nameInputBlurHandler}
        value={enteredName}
        />
        {nameInputIsValid && <p className="error-text"> Name must not be empty.</p>}

      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
