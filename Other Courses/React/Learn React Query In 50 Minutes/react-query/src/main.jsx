import React from 'react'
import ReactDOM from 'react-dom/client'
import Example01 from './Example01.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Example02 from "./Example02.jsx";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Example02/>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>
)
