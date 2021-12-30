import { FAILED_DATA, FETCH_DATA, SUCCESS_DATA } from "./actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null
};


const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true
      };
    case SUCCESS_DATA:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case FAILED_DATA:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default usersReducer;