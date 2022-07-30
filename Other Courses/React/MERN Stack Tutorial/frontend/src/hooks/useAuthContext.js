import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";


export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be inside an authContextProvider");
  }
  return context;
};
