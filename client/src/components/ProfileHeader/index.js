import React from "react";
import classes from "./index.module.css";

const ProfileHeader = ({ user }) => {
  return (
    <div className={classes.container}>
      <div>
        <img className={classes.picture} src={user.picture} alt="Mock Name" />
        <p className={classes.bannername}>{user.name}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
