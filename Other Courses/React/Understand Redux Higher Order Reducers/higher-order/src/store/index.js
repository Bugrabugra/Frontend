import { combineReducers, createStore } from "redux";
import articleReducer from "./reducers/articleReducer";
import userReducer from "./reducers/userReducer";


const add = (reducer, section) => (state, action) => {
  if (action.type === `ADD_${section}`) {
    return [...state, action.payload]
  }
  
  return reducer(state, action);
}

const store = createStore(
  combineReducers({
    users: add(userReducer, "USER"),
    articles: add(articleReducer, "ARTICLE"),
  })
);

export default store;