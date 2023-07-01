import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import HomeScreen from "./screen/HomeScreen.jsx";
import LoginScreen from "./screen/LoginScreen.jsx";
import RegisterScreen from "./screen/RegisterScreen.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import ProfileScreen from "./screen/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      {/*private route*/}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
