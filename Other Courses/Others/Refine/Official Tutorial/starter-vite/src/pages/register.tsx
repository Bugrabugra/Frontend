import React from "react";
import { AuthPage } from "@refinedev/antd";

export const Register = () => {
  return (
    <AuthPage
      type="register"
      formProps={{
        initialValues: {
          email: "demo@demo.com",
          password: "demodemo",
        },
      }}
    />
  );
};
