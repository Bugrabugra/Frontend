import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Login from "./views/Login";
import Account from "./views/Account";
import Authenticate from "./views/Authenticate";
import PrivateRoute from "./layouts/PrivateRoute";
import { useStytch } from "@stytch/stytch-react";
import { useCallback } from "react";


function App() {
  const client = useStytch();
  const navigate = useNavigate();

  const handleLogin = async (email) => {
    await client.magicLinks.email.loginOrCreate(email);
    alert(`Email has been sent to ${email}`);
  };

  const handleLogout = useCallback(async () => {
    await client.session.revoke();
    alert("Logged out!");
    navigate(0);
  }, [client]);

  return (
    <>
      <Navigation handleLogout={handleLogout}/>
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
        <Route path="/account" element={
          <PrivateRoute>
            <Account/>
          </PrivateRoute>
        }/>
        <Route path="/authenticate" element={<Authenticate/>}/>
        <Route path="*" element={<p>404! Page not found!</p>}/>
      </Routes>
    </>
  )
}

export default App
