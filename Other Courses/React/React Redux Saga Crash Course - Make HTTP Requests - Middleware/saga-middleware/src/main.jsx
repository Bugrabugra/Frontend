import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { applyMiddleware, createStore } from "redux";
import { devToolsEnhancer } from '@redux-devtools/extension';
import reducers from "./reducers";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "@redux-devtools/extension";
import rootSaga from "./sagas/rootSaga";


const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
