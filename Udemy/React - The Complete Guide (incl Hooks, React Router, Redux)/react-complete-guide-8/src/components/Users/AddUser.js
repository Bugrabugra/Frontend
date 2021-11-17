import styles from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import {useRef, useState} from "react";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";


const AddUser = (props) => {
  const refNameInput = useRef();
  const refAgeInput = useRef();

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredUserName = refNameInput.current.value;
    const enteredUserAge = refAgeInput.current.value;

    if (enteredUserName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)."
      })
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0)."
      })
      return;
    }
    props.onAddUser(enteredUserName, enteredUserAge);
    refNameInput.current.value = "";
    refAgeInput.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}

      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={refNameInput}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            ref={refAgeInput}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default AddUser;