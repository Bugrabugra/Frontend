import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login.tsx";
import Signup from "./auth/Signup.tsx";
import Home from "./home/Home.tsx";
import Chat from "./chat/Chat.tsx";
import Profile from "./profile/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/chats/:_id",
    element: <Chat />
  },
  {
    path: "/profile",
    element: <Profile />
  }
]);

export default router;
