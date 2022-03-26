import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";


const middleware = [ReduxThunk];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
