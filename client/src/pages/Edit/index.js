import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import classes from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import axiosInstance from "../../axios";
import Loader from "../../components/Loader";

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
  const [userExpertise, setUserExpertise] = useState("");
  const [userLearning, setUserLearning] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getIdTokenClaims } = useAuth0();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
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
      setLoading(false);
    }
    fetchData();
  }, []);

  const onSubmitHandler = async () => {
    setLoading(true);
    // Update Profile Data
    const token = (await getIdTokenClaims())?.__raw;

    const data = {
      timeZone: userProfile.timeZone,
      socialLink: userProfile.socialLink,
    };
    try {
      // Axios.defaults.headers()
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      axiosInstance.defaults.headers.common[
        "Access-Control-Allow-Origin"
      ] = `*`;
      await axiosInstance.put("/user/edit", data);
      const topics = userExpertise.split(",");
      const topicPromises = topics.map((topic) =>
        axiosInstance.post("/expertise/add", { topic, level: 1, tags: [] })
      );
      const learnings = userLearning.split(",");
      const learningPromises = learnings.map((topic) =>
        axiosInstance.post("/learning/add", { topic, level: 1 })
      );
      await Promise.all([...topicPromises, ...learningPromises]);
      setLoading(false);
      setProfileUpdated(true);
    } catch (err) {
      setLoading(false);
    }
  };
  if (profileUpdated) {
    return <Redirect to="/profile" />;
  }
  return (
    <div>
      {/* Social Cards */}
      <div className={classes.cards}>
        <div className={classes.card}>
          <form className>
            <h2>Basic Information</h2>
            <div className={classes.formbasic}>
              <CssTextField
                name="calendly"
                id="outlinedreadonlyinput"
                label="Calendly"
                placeholder="http://calendly.com/username"
                variant="outlined"
                disabled={loading}
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
                disabled={loading}
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
            </div>
          </form>
        </div>
      </div>
      {/* // Expertise */}
      <div className={classes.cards}>
        <SkillsCard
          heading={"Expertise"}
          skills={userExpertise}
          updateSkills={setUserExpertise}
        />
        <SkillsCard
          heading={"Learnings"}
          skills={userLearning}
          updateSkills={setUserLearning}
        />
      </div>
      <div className={classes.submitbutton} onClick={onSubmitHandler}>
        <Button classes={{ root: classes.meetbutton }}>
          {loading ? <Loader /> : "Update Profile"}
        </Button>
      </div>
    </div>
  );
};

function SkillsCard(props) {
  return (
    <div className={classes.card}>
      <form className>
        <h2>{props.heading}</h2>
        <div className={classes.formbasic}>
          <div className={classes.skill}>
            {props.skills.map((skill, index) => (
              <p id={index} className={classes.skillname}>
                {skill}
              </p>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Edit;
