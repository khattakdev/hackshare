import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { ReactComponent as Logo } from "../../assets/Logo.svg";
import ProfileMenu from "../../components/ProfileMenu";
import styles from "./index.module.css";

const linkData = [
  {
    name: "Experts",
    route: "/experts",
  },
  {
    name: "Learners",
    route: "/learners",
  },
];

const Header = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  // @TODO: Change window.location to react router
  const handleLogout = () => logout({ returnTo: window.location.origin });

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Link to="/">
          <Logo className={styles.logo}/>
        </Link>
        <div className={styles.spacer}></div>
        {isAuthenticated &&
          linkData.map((link, i) => (
            <Link className={styles.link} to={link.route} key={i}>
              {link.name}
            </Link>
          ))}
        {user && (
          <ProfileMenu
            logout={handleLogout}
            user={user}
            edge="end"
          ></ProfileMenu>
        )}
        {!isAuthenticated && (
          <Button
            classes={{ root: styles.login }}
            variant="outlined"
            onClick={loginWithRedirect}
          >
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
