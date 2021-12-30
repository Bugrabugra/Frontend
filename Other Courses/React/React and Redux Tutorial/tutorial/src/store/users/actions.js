import { FAILED_DATA, FETCH_DATA, SUCCESS_DATA } from "./actionTypes";

export const getData = () => {
  console.log("getData action");
  return dispatch => {
    dispatch({type: FETCH_DATA});
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => dispatch({ type: SUCCESS_DATA, payload: data }))
      .catch((error) => dispatch({ type: FAILED_DATA, payload: error }));
  };
};