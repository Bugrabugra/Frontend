import { all, call, cancel, delay, fork, put, race, spawn, take } from 'redux-saga/effects';
import {authFail, authSuccess, AUTH_START, logoutFail, logoutSuccess, LOGOUT_START} from "./Auth.actions";
import {registerUser, loginUser, logoutUser} from "../../utils/api";


// function* authenticate({email, password, isRegister}) {
//   try {
//     let data;
//     if (isRegister) {
//       data = yield call(registerUser, {email, password});
//     } else {
//       data = yield call(loginUser, {email, password});
//     }
//     yield put(authSuccess(data.user));
//     return data.user.uid;
//   } catch (error) {
//     yield put(authFail(error.message));
//   }
// };

function* authenticate({email, password, isRegister}) {
  try {
    if (isRegister) {
      
    } else {
      const {data, timeout} = yield race({
        data: call(loginUser, {email, password}),
        timeout: delay(1000)
      });
      
      if (data) {
        yield put(authSuccess(data.user));
        return data.user.uid;
      } else {
        yield put(authFail("The login didn't finish in accepted time"));
      }
    }
  } catch (error) {
    yield put(authFail(error.message));
  }
};

function* logout() {
  try {
    yield call(logoutUser);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFail(error.message));
  }
};

function* longRunningYield() {
  yield delay(5000);
  yield console.log("Hi");
};

function* throwErrorSaga() {
  yield delay(1000);
  yield call(() => {
    throw Error("New Error from saga");
  })
};

function* authFlow() {
  while (true) {
    const {payload} = yield take(AUTH_START);
    const uid = yield call(authenticate, payload);
    const forkedSaga = yield fork(longRunningYield);
    // yield spawn(throwErrorSaga);
    
    if (uid) {
      yield take(LOGOUT_START);
      yield call(logout);
      yield cancel(forkedSaga);
    }
  }
};

export default function* () {
  yield all([authFlow()]);
};
