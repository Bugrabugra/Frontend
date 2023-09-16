import React, { ReactNode } from "react";
import Link from "next/link";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav>
        <h1>Dojo Helpdesk</h1>
        <Link href="/signup">Sign up</Link>
        <Link href="/login">Log in</Link>
      </nav>
      {children}
    </>
  );
};

export default AuthLayout;
