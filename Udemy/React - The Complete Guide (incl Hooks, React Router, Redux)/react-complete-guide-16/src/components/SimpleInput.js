import useInput from "../hooks/use-input";


const SimpleInput = () => {
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    inputBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== "");

  const {
    value: enteredMail,
    isValid: enteredMailIsValid,
    hasError: mailInputHasError,
    inputBlurHandler: mailBlurHandler,
    valueChangeHandler: mailChangeHandler,
    reset: resetMailInput
  } = useInput(validateEmail)

  let formIsValid = false;

  if (enteredNameIsValid && enteredMailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    resetNameInput();
    resetMailInput();
  };

  const nameInputClasses = nameInputHasError ?
    "form-control invalid" :
    "form-control";

  const mailInputClasses = mailInputHasError ?
    "form-control invalid" :
    "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>

      <div className={mailInputClasses}>
        <label htmlFor='email'>Your E-mail</label>
        <input
          type="email"
          id='email'
          onChange={mailChangeHandler}
          onBlur={mailBlurHandler}
          value={enteredMail}
        />
        {mailInputHasError && <p className="error-text">Email must be provided</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
