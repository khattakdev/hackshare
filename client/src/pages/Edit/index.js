import React, { Component, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import classes from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import axiosInstance from "../../axios";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);

const Edit = () => {
  const [userProfile, setUserProfile] = useState({});
  const [userExpertise, setUserExpertise] = useState([]);
  const [userLearning, setUserLearning] = useState([]);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const { getIdTokenClaims } = useAuth0();
  useEffect(() => {
    async function fetchData() {
      const token = (await getIdTokenClaims())?.__raw;

      const profile = await axiosInstance.get("/user/whoami", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      const expertise = await axiosInstance.get(
        `/expertise/${profile.data.responseData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const learning = await axiosInstance.get(
        `/learning/${profile.data.responseData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const modifiedExpertise = expertise.data.msg
        .map((exp) => {
          return exp.topic;
        })
        .join(",");

      const modifiedLearning = learning.data.msg
        .map((exp) => {
          return exp.topic;
        })
        .join(",");

      setUserProfile(profile.data.responseData);
      setUserExpertise(modifiedExpertise);
      setUserLearning(modifiedLearning);
    }
    fetchData();
  }, []);

  const onSubmitHandler = async () => {
    // Update Profile Data
    const token = (await getIdTokenClaims())?.__raw;

    const data = {
      timeZone: userProfile.timeZone,
      socialLink: userProfile.socialLink,
    };

    // Axios.defaults.headers()
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = `*`;
    await axiosInstance.post("/user/edit", {
      data: JSON.stringify(data),
    });

    const topics = userExpertise.split(",");

    await axiosInstance.post("/expertise/add", {
      data: JSON.stringify(topics),
    });

    const learning = userLearning.split(",");
    await axiosInstance.post("/learning/add", {
      data: JSON.stringify(learning),
    });
  };
  if (profileUpdated) {
    return <Redirect to="/profile" />;
  }
  return (
    <div>
      {/* Social Cards */}
      <div className={classes.cards}>
        <div className={classes.card}>
          <form class>
            <div class={classes.formbasic}>
              <CssTextField
                name="calendly"
                id="outlinedreadonlyinput"
                label="Calendly"
                placeholder="http://calendly.com/username"
                variant="outlined"
                value={userProfile.socialLink}
                onChange={(e) => {
                  const tempProfile = {
                    ...userProfile,
                    socialLink: e.target.value,
                  };
                  setUserProfile(tempProfile);
                }}
                InputLabelProps={{ style: { color: "#fff" } }}
                inputProps={{
                  style: { fontFamily: "Arial", color: "white" },
                }}
                style={{
                  flex: 1,
                  alignSelf: "center",
                  width: 550,
                  margin: "20px 20px 20px 20px",
                  color: "white",
                }}
              />
              <CssTextField
                name="timeZone"
                id="outlinedreadonlyinput"
                label="Time Zone"
                defaultValue=""
                placeholder="GMT +5"
                variant="outlined"
                value={userProfile.timeZone}
                onChange={(e) => {
                  const tempProfile = {
                    ...userProfile,
                    timeZone: e.target.value,
                  };
                  setUserProfile(tempProfile);
                }}
                InputLabelProps={{ style: { color: "#fff" } }}
                inputProps={{
                  style: { fontFamily: "Arial", color: "white" },
                }}
                style={{
                  flex: 1,
                  alignSelf: "center",
                  width: 300,
                  margin: "20px 20px 20px 20px",
                  color: "white",
                }}
              />
              <CssTextField
                name="expertise"
                id="outlinedreadonlyinput"
                label="Expertise"
                defaultValue=""
                placeholder="Javascript, NodeJs, Python, DJango"
                variant="outlined"
                value={userExpertise}
                onChange={(e) => {
                  setUserExpertise(e.target.value);
                }}
                InputLabelProps={{ style: { color: "#fff" } }}
                inputProps={{
                  style: { fontFamily: "Arial", color: "white" },
                }}
                style={{
                  flex: 1,
                  alignSelf: "center",
                  width: 300,
                  margin: "20px 20px 20px 20px",
                  color: "white",
                }}
              />
              <CssTextField
                name="learning"
                id="outlinedreadonlyinput"
                label="Learning"
                defaultValue=""
                value={userLearning}
                placeholder="Javascript, NodeJs, Python, DJango"
                variant="outlined"
                onChange={(e) => {
                  setUserLearning(e.target.value);
                }}
                InputLabelProps={{ style: { color: "#fff" } }}
                inputProps={{
                  style: { fontFamily: "Arial", color: "white" },
                }}
                style={{
                  flex: 1,
                  alignSelf: "center",
                  width: 300,
                  margin: "20px 20px 20px 20px",
                  color: "white",
                }}
              />
            </div>
          </form>
        </div>
      </div>
      <div className={classes.submitbutton} onClick={onSubmitHandler}>
        <Button classes={{ root: classes.meetbutton }}>Update Profile</Button>
      </div>
    </div>
  );
};

export default Edit;
