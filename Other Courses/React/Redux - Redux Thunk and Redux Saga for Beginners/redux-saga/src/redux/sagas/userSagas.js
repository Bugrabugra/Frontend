import { put, takeEvery, call, all, race } from "redux-saga/effects";
import { FIND_CUSTOMER, FIND_CUSTOMER_SAGA, FIND_EMPLOYEE, FIND_EMPLOYEE_SAGA } from "../types";
import { wait } from "./cartSagas";


const url = "https://randomuser.me/api/";
const setHeaders = { headers: { "Content-Type": "application/json" } };

// export function* findEmployeeSaga() {
//   let response = yield fetch(url, setHeaders);
//   response = yield response.json();
//   console.log(response);
//   let employee = response.results[0];
//   yield put({ type: FIND_EMPLOYEE, payload: employee });
// }

export function* findUserSaga() {
  let response = yield fetch(url, setHeaders);
  response = yield response.json();
  console.log(response);
  let customer = response.results[0];
  yield put({ type: FIND_CUSTOMER, payload: customer })
}

// export function* findBoth() {
//   let [employeeFinder, customerFinder] = yield all([
//     call(fetch, url, setHeaders),
//     call(fetch, url, setHeaders)
//   ]);
//   [employeeFinder, customerFinder] = yield all([
//     employeeFinder.json(),
//     customerFinder.json()
//   ]);
//   [employeeFinder, customerFinder] = yield all([
//     employeeFinder.results[0],
//     customerFinder.results[0]
//   ]);
//   yield all([
//     put({ type: FIND_EMPLOYEE, payload: employeeFinder }),
//     put({ type: FIND_CUSTOMER, payload: customerFinder })
//   ]);
// }

function* raceMe() {
  const { person, timeout } = yield race({
    person: call(fetch, url, setHeaders),
    timout: wait(1000)
  });
  if (person) {
    console.log("Success")
  } else {
    console.log("tooo slow")
  }
}

export function* watchFindEmployeeSaga() {
  yield takeEvery(FIND_EMPLOYEE_SAGA, raceMe);
}

export function* watchFindCustomerSaga() {
  yield takeEvery(FIND_CUSTOMER_SAGA, findUserSaga);
}
