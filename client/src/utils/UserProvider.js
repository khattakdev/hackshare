import { createContext } from "react";

export const UserContext = createContext({
  user: undefined,
  setUser: () => {},
  loading: false,
});
export const UserProvider = UserContext.Provider;
