import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./index.module.css";

const Loader = () => {
  return (
    <div className={classes.root}>
      <CircularProgress classes={{ root: classes.spinner }} />
    </div>
  );
};

export default Loader;
