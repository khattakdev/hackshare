import React from "react";
import { Link } from "react-router-dom";
import classes from "./index.module.css";
import defaultPicture from "../../assets/user_icon.png";
import { Button } from "@material-ui/core";

const ProfileCard = (props) => {
  const data = props.data;
  return (
    <div className={classes.card}>
      <div>
        <div className={classes.intro}>
          <div>
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
              <p className={classes.endorsment}>{`Endorsed by ${
                Math.floor(Math.random() * 3) === 0
                  ? "nobody"
                  : "a couple of people"
              }`}</p>
            </Link>
          </div>
          {props.expert && (
            <div className={classes.bannerdetail}>
              <Link to={`/profile/${data._id}`}>
                <Button
                  classes={{ root: classes.viewprofile }}
                  variant="outlined"
                >
                  View
                </Button>
              </Link>
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

export default ProfileCard;
