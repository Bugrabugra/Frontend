import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { StytchProvider, initStytch } from "@stytch/stytch-react";


const stytch = initStytch(import.meta.env.VITE_PUBLIC_TOKEN);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StytchProvider stytch={stytch}>
      <Router>
        <App/>
      </Router>
    </StytchProvider>
  </React.StrictMode>
)
