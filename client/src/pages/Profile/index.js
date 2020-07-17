import React, { useState, useEffect } from "react";
import classes from "./index.module.css";
import Loader from "../../components/Loader";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TodayIcon from "@material-ui/icons/Today";
import Tooltip from "@material-ui/core/Tooltip";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Register from "../../components/Register";
import axiosInstance from "../../axios";
import { useAuth0 } from "@auth0/auth0-react";

const Skills = (props) => {
  return (
    <div className={classes.card} id={classes.skills}>
      <p className={classes.cardtitle}>{props.title}</p>
      <div className={classes.skill}>
        {props.topics.map((topic, index) => (
          <p key={index} className={classes.skillname}>
            {topic}
          </p>
        ))}
      </div>
    </div>
  );
};

const Profile = ({ match: { params } }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userSkills, setUserSkills] = useState({});
  const [userLearnings, setUserLearnings] = useState({});
  const [dialogOpen, showDialog] = useState(true);
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

      if (params.id) {
        return (
          await axiosInstance.get(`/user/${params.id}`, {
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

    async function fetchUserLearning(id) {
      const token = (await getIdTokenClaims())?.__raw;
      return await axiosInstance.get(`/learning/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    returnData().then(async (res) => {
      if (!res) return handleOpen();
      const skills = (await fetchUserSkills(res._id)).data.msg.map((exp) => {
        return exp.topic;
      });
      const learnings = (await fetchUserLearning(res._id)).data.msg.map(
        (exp) => {
          return exp.topic;
        }
      );
      setUserProfile(res);
      setUserSkills(skills);
      setUserLearnings(learnings);
    });
  }, [getIdTokenClaims, params]);

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
                <Skills title="Skills" topics={userSkills} />
              ) : (
                <p>No Skills</p>
              )}
            </section>
            <section className={classes.cards}>
              {userLearnings.length > 0 ? (
                <Skills title="Learning" topics={userLearnings} />
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
