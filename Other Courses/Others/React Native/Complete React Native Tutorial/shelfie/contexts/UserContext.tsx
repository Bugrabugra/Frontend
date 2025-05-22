import { createContext, ReactNode, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { ID, Models } from "react-native-appwrite";

type UserContextType = {
  user: Models.User<Models.Preferences> | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  authChecked: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  login: async (email: string, password: string) => {},
  register: async (email: string, password: string) => {},
  logout: () => {},
  authChecked: false,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  async function register(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function getInitialUserValue() {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}
