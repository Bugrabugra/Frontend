import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App_query from './App_query'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App_query />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
