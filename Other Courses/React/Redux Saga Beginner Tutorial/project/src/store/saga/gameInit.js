import { call, fork, take, put, delay, cancel } from "redux-saga/effects";
import { fetchQuizFromApi } from "../../utils/api";
import { fetchQuestionsFail, fetchQuestionsSuccess } from "../slices/game";
import { cancelGame, startGame } from "../slices/gameInit";


function* fetchQuestionsSaga() {
  try {
    // yield delay(60000);
    const data = yield call(fetchQuizFromApi);
    yield put(fetchQuestionsSuccess(data));
  } catch (error) {
    yield put(fetchQuestionsFail("There was an error fetching the questions"));
  }
};

function* cancelFetchQuiz(forkedSaga) {
  while (true) {
    yield take(cancelGame.type);
    yield cancel(forkedSaga);
  }
};

export default function* startGameSaga() {
  while (true) {
    yield take(startGame.type);
    const forkedSaga = yield fork(fetchQuestionsSaga);
    yield fork(cancelFetchQuiz, forkedSaga);
  }
};