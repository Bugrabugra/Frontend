import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.includes("@")};
  }
  if (action.type === "INPUT_BLUR") {
    return {value: state.value, isValid: state.value.includes("@")};
  }
  return {value: "", isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type === "INPUT_BLUR") {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: "", isValid: false};
}

const Login = () => {
  const ctx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    {value: "", isValid: false}
  );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    {value: "", isValid: null}
  );

  const refEmailInput = useRef();
  const refPasswordInput = useRef();

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  useEffect(() => {
    console.log("effect running");

    return () => {
      console.log("effect cleanup");
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("use effect", formIsValid);
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log("clean");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "USER_INPUT", val: event.target.value});

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      refEmailInput.current.focus();
    } else {
      refPasswordInput.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={refEmailInput}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={refPasswordInput}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
