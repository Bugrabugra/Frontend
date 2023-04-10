'use client'

import React from 'react';
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <li className="list-none">
      <button
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        onClick={() => signIn()}
      >Sign In
      </button>
    </li>
  );
};

export default Login;
