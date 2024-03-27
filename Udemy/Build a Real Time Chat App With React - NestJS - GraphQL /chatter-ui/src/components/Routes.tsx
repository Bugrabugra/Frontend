import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login.tsx";
import Signup from "./auth/Signup.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

export default router;
