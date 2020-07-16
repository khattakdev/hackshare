import React, { useEffect, useState } from "react";
import { UserProvider } from "./UserProvider.js";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const User = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const {
    // isLoading,
    isAuthenticated,
    // error,
    // user,
    // loginWithRedirect,
    // logout,
    // getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  try {
    useEffect(() => {
      const getUserInfo = async () => {
        try {
          const token = await getIdTokenClaims();
          console.log(token);
          console.log("----");
          const res = await axios(
            "https://mlhhackshare.herokuapp.com/user/whoami",
            {
              headers: {
                Authorization: `Bearer ${token.__raw}`,
              },
            }
          );
          console.log("----");
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      };
      if (isAuthenticated) getUserInfo();
    }, [isAuthenticated, getIdTokenClaims]);

    console.log(isAuthenticated);
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
  } catch (error) {
    return <>{children}</>;
  }
};

export default User;
