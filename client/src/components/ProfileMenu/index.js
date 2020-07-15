import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import styles from "./index.module.css";

const ProfileMenu = ({ user, logout }) => {
  const anchorRef = React.useRef(null);
  const [isShown, setIsShown] = useState(false);
  const handleClose = () => setIsShown(false);
  console.log(user);
  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      ref={anchorRef}
    >
      <Avatar className={styles.avatar} alt={user.name} src={user.picture} />
      <p className={styles.nickname}>{user.nickname}</p>
      <p>{isShown}</p>
      <Menu
        className={styles.menuItem}
        anchorEl={anchorRef.current}
        open={isShown}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem className={styles.menuItem} onClick={handleClose}>
          <Link to="/profile">Profile</Link>
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={logout}>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};

ProfileMenu.propTypes = {
  user: PropTypes.element.isRequired,
  logout: PropTypes.element.isRequired,
};

export default ProfileMenu;
