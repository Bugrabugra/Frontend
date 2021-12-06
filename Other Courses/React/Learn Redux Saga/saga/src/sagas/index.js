import {takeEvery} from "redux-saga/effects";
import {IMAGES} from "../constants";


const handleImagesLoad = () => {
  console.log("fetching images from unsplash");
};

const handleDang = () => {
  console.log("DANG!!");
};

// watcher saga
function* rootSaga() {
  yield takeEvery(IMAGES.LOAD, handleImagesLoad)
}

// watcher saga => actions > worker saga

export default rootSaga;
