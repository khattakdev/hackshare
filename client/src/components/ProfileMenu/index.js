import React, { useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import styles from "./index.module.css";

const DropdownMenu = (props) => {
  return (
    <Menu
      classes={{ paper: styles.menu }}
      anchorEl={props.anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={props.menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={props.isShown}
      onClose={props.handleClose}
    >
      <MenuItem className={styles.menuitem} onClick={props.handleClose}>
        <Link to="/profile">Profile</Link>
      </MenuItem>
      <MenuItem className={styles.menuitem} onClick={props.logout}>
        Log Out
      </MenuItem>
    </Menu>
  );
};

const ProfileMenu = ({ user, logout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-menu";

  return (
    <>
      <div
        className={styles.container}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar className={styles.avatar} alt={user.name} src={user.picture} />
        <p className={styles.nickname}>{user.nickname}</p>
        <ArrowDropDownIcon ref={anchorEl} />
      </div>
      <DropdownMenu
        anchorEl={anchorEl}
        logout={logout}
        isShown={Boolean(anchorEl)}
        handleClose={handleClose}
        menuId={menuId}
      />
    </>
  );
};

export default ProfileMenu;
