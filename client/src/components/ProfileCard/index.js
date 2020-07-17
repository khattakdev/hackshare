import React from "react";
import { Link } from "react-router-dom";
import classes from "./index.module.css";
import defaultPicture from "../../assets/user_icon.png";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
}));

const index = (props) => {
  const data = props.data;
  return (
    <div className={classes.card}>
      <div>
        <div className={classes.intro}>
          <div className={classes.profileimage}>
            <img
              className={classes.bannerphoto}
              src={data.picture ? data.picture : defaultPicture}
              alt={data.name}
            ></img>
          </div>
          <Link to={`/profile/${data._id}`}>
            <p
              className={
                props.expert
                  ? classes.bannername
                  : `${classes.bannername} ${classes.banner_margin_bottom}`
              }
            >
              {data.name}
            </p>
          </Link>
          {props.expert && (
            <div className={classes.bannerdetail}>
              <p>Endorsed by 5 people</p>
              <a href={data.socialLink}>
                <Button
                  classes={
                    data.socialLink
                      ? { root: classes.meetingrequest }
                      : { root: classes.disable_btn }
                  }
                  variant="outlined"
                >
                  Request
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
