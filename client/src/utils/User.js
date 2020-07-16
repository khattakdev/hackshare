import React, { useEffect, useState } from "react";
import { UserProvider } from "./UserProvider.js";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "../axios";

const User = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState("");
  const {
    isLoading,
    isAuthenticated,
    // error,
    user: authUser,
    loginWithRedirect,
    // logout,
    // getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  useEffect(async () => {
    const oldToken = localStorage.getItem("authToken");
    if (oldToken) {
      setToken(oldToken);
      console.log(isLoading);
      if (!isLoading && !authUser) loginWithRedirect();
    }
  }, []);

  useEffect(() => {
    if (token) localStorage.setItem("authToken", token);
  }, [token]);

  // try {
  useEffect(() => {
    const getToken = async () => {
      const newToken = await getIdTokenClaims();
      setToken(newToken.__raw);
    };

    const getUserInfo = async () => {
      try {
        if (!token) await getToken();
        const res = await axios("/user/whoami", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.responseData) setUser(res.data.responseData);
        else if (res.status === 200) {
          setUser({ registered: false });
        }
        console.log("----");
        console.log(res);
        console.log("----");
      } catch (error) {
        console.log(error);
      }
    };
    if (token || isAuthenticated) getUserInfo();
  }, [isAuthenticated, getIdTokenClaims]);

  return (
    <UserProvider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </UserProvider>
  );
  // } catch (error) {
  //   return <>{children}</>;
  // }
};

export default User;
