import { Stack } from "expo-router";
import React from "react";

const MenuStack = () => {
  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MenuStack;
