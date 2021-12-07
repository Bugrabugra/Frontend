import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from "redux-logger";
import cakeReducer from "./cake/cakeReducer";
import iceCreamReducer from "./iceCream/iceCreamReducer";
import {composeWithDevTools} from "redux-devtools-extension";


const logger = createLogger();

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

export default store;