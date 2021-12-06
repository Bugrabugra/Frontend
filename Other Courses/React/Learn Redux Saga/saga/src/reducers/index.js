import {combineReducers} from "redux";
import loadingReducer from "./loadingReducer";
import imagesReducer from "./imagesRedıcer";
import errorReducer from "./errorReducer";


const rootReducer = combineReducers({
  isLoading: loadingReducer,
  images: imagesReducer,
  error: errorReducer
});

export default rootReducer;
