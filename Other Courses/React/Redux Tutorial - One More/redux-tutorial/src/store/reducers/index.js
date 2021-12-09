import {combineReducers} from "redux";
import userReducer from "./userReducer";
import activeUserReducer from "./activeUserReducer";


const rootReducer = combineReducers({
  users: userReducer,
  activeUser: activeUserReducer
});

export default rootReducer;