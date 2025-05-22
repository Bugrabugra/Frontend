import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within the context");
  }

  return context;
}
