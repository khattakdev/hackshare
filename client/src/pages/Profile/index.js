import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../utils/UserProvider";
import Register from "../../components/Register";

import classes from "./index.module.css";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [dialogOpen, showDialog] = useState(false);

  const handleOpen = () => {
    showDialog(true);
  };

  const handleClose = () => {
    showDialog(false);
  };

  useEffect(() => {
    if (!user.registered) handleOpen();
  }, []);

  return (
    <div>
      {user && user.email}
      <Register open={dialogOpen} onClose={handleClose}></Register>
    </div>
  );
};

export default Profile;
