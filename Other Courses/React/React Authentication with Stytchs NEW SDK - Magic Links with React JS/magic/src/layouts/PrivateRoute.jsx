import { Navigate } from "react-router-dom";
import React from 'react';
import { useStytchSession } from "@stytch/stytch-react";


const PrivateRoute = ({ children }) => {
  const session = useStytchSession();
  if (!session) {
    return <Navigate to="/login" replace/>
  }
  return children;
};

export default PrivateRoute;
