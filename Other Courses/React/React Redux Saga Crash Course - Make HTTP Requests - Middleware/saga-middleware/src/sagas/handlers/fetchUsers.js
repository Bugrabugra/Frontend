import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import fetchGetUsers from "../requests/fetchUsers";


function* handleGetUsers() {
  try {
    const users = yield call(fetchGetUsers);
    yield put({ type: "GET_USERS_SUCCESS", users: users })
  } catch(error) {
    yield put({ type: "GET_USERS_FAILED", message: error.message })
  }
}

function* watcherUserSaga() {
  yield takeLatest("GET_USERS_REQUESTED", handleGetUsers);
}

export default watcherUserSaga;
