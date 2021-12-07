import { applyMiddleware, createStore } from "redux"

import {createLogger} from "redux-logger"
import thunk from "redux-thunk"
import {createPromise} from "redux-promise-middleware"

import reducer from "../reducers"

const logger = createLogger();
const promise = createPromise();
const middleware = applyMiddleware(promise, thunk, logger)

export default createStore(reducer, middleware);