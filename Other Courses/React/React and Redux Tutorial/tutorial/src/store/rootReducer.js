import { combineReducers } from "redux";
import diamondReducer from "./diamond/reducer";
import usersReducer from "./users/reducer";


const rootReducer = combineReducers({
  diamond: diamondReducer,
  users: usersReducer
});

export default rootReducer;