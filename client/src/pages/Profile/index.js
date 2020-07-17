import React, { Component, useState, useEffect } from "react";
import classes from "./index.module.css";
import Loader from "../../components/Loader";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TodayIcon from "@material-ui/icons/Today";
import Tooltip from "@material-ui/core/Tooltip";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Register from "../../components/Register";
import axiosInstance from "../../axios";
import { useAuth0 } from "@auth0/auth0-react";

class Badges extends Component {
  render() {
    return (
      <div className={classes.card} id={classes.badge}>
        <p className={classes.cardtitle}>Badge</p>
        <div>
          <img
            alt="Name Of Accomplishment"
            src="https://img.icons8.com/plasticine/100/000000/warranty.png"
          />
        </div>
      </div>
    );
  }
}

const Skills = (props) => {
  return (
    <div className={classes.card} id={classes.skills}>
      <p className={classes.cardtitle}>Skills </p>
      <div className={classes.skill}>
        {props.skills.map((skill, index) => (
          <p id={index} className={classes.skillname}>
            {skill}
          </p>
        ))}
      </div>
    </div>
  );
};

const Profile = (props) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userSkills, setUserSkills] = useState({});
  const [dialogOpen, showDialog] = useState(false);
  const { getIdTokenClaims } = useAuth0();

  const handleOpen = () => {
    showDialog(true);
  };

  const handleClose = () => {
    showDialog(false);
  };

  useEffect(() => {
    async function returnData() {
      const token = (await getIdTokenClaims())?.__raw;

      if (props.match.params.id) {
        return (
          await axiosInstance.get(`/user/${props.match.params.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
            },
          })
        ).data;
      } else {
        return (
          await axiosInstance.get(`/user/whoami`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
            },
          })
        ).data.responseData;
      }
    }

    async function fetchUserSkills(id) {
      const token = (await getIdTokenClaims())?.__raw;
      return await axiosInstance.get(`/expertise/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    returnData().then(async (res) => {
      console.log(res);
      const skills = (await fetchUserSkills(res._id)).data.msg.map((exp) => {
        return exp.topic;
      });
      if (!res) handleOpen();
      setUserProfile(res);
      setUserSkills(skills);
    });
  }, []);

  return (
    <div>
      {userProfile ? (
        <>
          <div>
            <div className={classes.intro}>
              <div className={classes.profileimage}>
                <img
                  className={classes.bannerphoto}
                  src={userProfile.picture}
                  alt={userProfile.name}
                ></img>
              </div>
              <p className={classes.bannername}>{userProfile.name}</p>
            </div>
            <div className={classes.links}>
              <Tooltip title={userProfile.timeZone}>
                <AccessTimeIcon />
              </Tooltip>
              {userProfile.socialLink && (
                <a
                  href={userProfile.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Tooltip title="Contact Link">
                    <TodayIcon />
                  </Tooltip>
                </a>
              )}
              <Tooltip title={userProfile.email}>
                <MailOutlineIcon />
              </Tooltip>
            </div>
          </div>
          <div>
            <section className={classes.cards}>
              {userSkills.length > 0 ? (
                <Skills skills={userSkills} />
              ) : (
                <p>No Skills</p>
              )}
            </section>
          </div>
        </>
      ) : (
        <div className={classes.loadercontainer}>
          <Loader />
        </div>
      )}
      <Register open={dialogOpen} onClose={handleClose}></Register>
    </div>
  );
};

export default Profile;
