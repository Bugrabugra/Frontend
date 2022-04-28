import React from 'react';
import { NavLink } from "react-router-dom";
import { useStytchSession } from "@stytch/stytch-react";


const Navigation = ({ handleLogout }) => {
  const session = useStytchSession();
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {!session && <NavLink to="/login">Login</NavLink>}
      {session && <NavLink to="/account">Account</NavLink>}
      {session && <button onClick={handleLogout} className="logout">Logout</button>}
    </nav>
  );
};

export default Navigation;
