import { combineReducers } from "redux";
import petCounter from "./petCounter";
import petFavorite from "./petFavorite";
import users from "./users";


const reducers = combineReducers({
  petCounter,
  petFavorite,
  users
});

export default reducers;
