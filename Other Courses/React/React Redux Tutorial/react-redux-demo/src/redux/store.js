import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import cakeReducer from "./cake/cakeReducer";
import userReducer from "./user/userReducer";
import iceCreamReducer from "./iceCream/iceCreamReducer";


const logger = createLogger();

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
  user: userReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;