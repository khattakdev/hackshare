import React from "react";
import classes from "./index.module.css";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const index = (props) => {
  return (
    <div className={classes.card}>
      <div>
        <div className={classes.intro}>
          <div className={classes.profileimage}>
            <img
              className={classes.bannerphoto}
              src="https://dummyimage.com/500/09f/fff.png"
              alt="Mock Name"
            ></img>
          </div>
          <p
            className={
              props.expert
                ? classes.bannername
                : `${classes.bannername} ${classes.banner_margin_bottom}`
            }
          >
            Rashika Karki
          </p>
          {props.expert && (
            <div className={classes.bannerdetail}>
              <p>Endorsed by 5 people</p>
              <Button
                classes={{ root: classes.meetingrequest }}
                variant="outlined"
              >
                Request
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
