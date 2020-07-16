import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import styles from "./index.module.css";

const ProfileMenu = ({ user, edit, logout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isShown = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuId = "primary-menu";

  const renderMenu = (
    <Menu
      classes={{ root: styles.menuroot, paper: styles.menu }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isShown}
      onClose={handleClose}
    >
      <MenuItem className={styles.menuitem} onClick={handleClose}>
        <Link to="/profile">Profile</Link>
      </MenuItem>
      <MenuItem className={styles.menuitem} onClick={handleClose}>
        <Link to="/edit">Edit Profile</Link>
      </MenuItem>
      <MenuItem className={styles.menuitem} onClick={logout}>
        Log Out
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <div
        className={styles.container}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <Avatar className={styles.avatar} alt={user.name} src={user.picture} />
        <p className={styles.nickname}>{user.nickname}</p>
        <ArrowDropDownIcon />
      </div>
      {renderMenu}
    </>
  );
};

ProfileMenu.propTypes = {
  user: PropTypes.element.isRequired,
  edit : PropTypes.element.isRequired,
  logout: PropTypes.element.isRequired,
};

export default ProfileMenu;
