import {applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import axios from "axios";


const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_START":
      return {...state,
        fetching: true};
    case "FETCH_USERS_ERROR":
      return {...state,
        fetching: false, error: action.payload};
    case "RECEIVE_USERS":
      return {...state,
        fetching: false, fetched: true, users: action.payload};
  }
  return state;
};

const logger = createLogger();

const middleware = applyMiddleware(promise, thunk, logger);
const store = createStore(reducer, middleware);

// store.dispatch({
//   type: "FETCH_USERS",
//   payload: axios.get("https://jsonplaceholder.typicode.com/users")
// })

store.dispatch(dispatch => {
  dispatch({type: "FETCH_USERS_START"});
  axios.get("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      dispatch({type: "RECEIVE_USERS", payload: response.data});
    }).catch(error => {
      dispatch({type: "FETCH_USERS_ERROR", payload: error});
  });
});