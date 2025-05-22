import React from "react";
import { Stack } from "expo-router";
import GuestOnly from "../../components/auth/GuestOnly";

const AuthLayout = () => {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </GuestOnly>
  );
};

export default AuthLayout;
