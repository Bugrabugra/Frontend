import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import TodosContextProvider from "./store/todos-context"

ReactDOM.render(
  <TodosContextProvider>
     <App />
  </TodosContextProvider>,
  document.getElementById('root')
)
