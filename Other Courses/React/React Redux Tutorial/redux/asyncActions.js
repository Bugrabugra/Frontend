const {createStore, applyMiddleware} = require("redux");
const thunk = require("redux-thunk").default;
const axios = require("axios");


// initial state
const initialState = {
  loading: false,
  users: [],
  error: ""
};

// constants
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// actions
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
};

// actions with thunk
const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios.get("https://jsonplacholder.typicode.com/users")
      .then(response => {
        const users = response.data.map(user => user.id);
        // response.data is the array of users
        dispatch(fetchUsersSuccess(users));
      }).catch(error => {
        // error.message
      dispatch(fetchUsersFailure(error.message));
    })
  };
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ""
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return state;
  }
};

// store
const store = createStore(reducer, applyMiddleware(thunk));

// subscribe to store
store.subscribe(() => {console.log(store.getState())});
store.dispatch(fetchUsers());