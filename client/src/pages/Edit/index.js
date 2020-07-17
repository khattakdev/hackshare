import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import classes from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Loader from "../../components/Loader";
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

      const {
        data: { msg: expertise },
      } = await axiosInstance.get(
        `/expertise/${profile.data.responseData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const {
        data: { msg: learning },
      } = await axiosInstance.get(
        `/learning/${profile.data.responseData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      setUserProfile(profile.data.responseData);
      setUserExpertise(expertise);
      setUserLearning(learning);
      setLoading(false);
    }
    fetchData();
  }, [getIdTokenClaims]);

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
      <div className={classes.submitbutton} onClick={onSubmitHandler}>
        <Button
          className={classes.submitbutton}
          classes={{ root: classes.meetbutton }}
        >
          {loading ? <Loader /> : "Update Profile"}
        </Button>
      </div>
      {/* // Expertise */}
      <div className={classes.cards}>
        <SkillsCard
          heading={"Expertise"}
          skills={userExpertise}
          updateSkills={setUserExpertise}
        />
        <SkillsCard
          heading={"Learning"}
          skills={userLearning}
          updateSkills={setUserLearning}
        />
      </div>
    </div>
  );
};

function SkillsCard(props) {
  const [skill, setSkill] = useState("");
  const [loadIndex, setLoadIndex] = useState(-1);
  const { getIdTokenClaims } = useAuth0();
  const addSkillHandler = async () => {
    const token = (await getIdTokenClaims())?.__raw;

    try {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      axiosInstance.defaults.headers.common[
        "Access-Control-Allow-Origin"
      ] = `*`;
      // await axiosInstance.put("/user/edit", data);
      const {
        data: { responseData: newSkill },
      } = await axiosInstance.post(`/${props.heading.toLowerCase()}/add`, {
        topic: skill,
      });
      const newSkills = [...props.skills];
      newSkills.push(newSkill);
      console.log(newSkill);
      props.updateSkills(newSkills);
    } catch (err) {}
  };

  const removeSkillHandler = async (id, index) => {
    setLoadIndex(index);
    const token = (await getIdTokenClaims())?.__raw;

    try {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      axiosInstance.defaults.headers.common[
        "Access-Control-Allow-Origin"
      ] = `*`;
      // await axiosInstance.put("/user/edit", data);
      await axiosInstance.delete(
        `/${props.heading.toLowerCase()}/remove/${id}`
      );
      const newSkills = props.skills.filter((skill) => {
        return skill._id !== id;
      });
      props.updateSkills(newSkills);
      setLoadIndex(-1);
    } catch (err) {
      setLoadIndex(-1);
    }
  };
  return (
    <div className={classes.card}>
      <form className>
        <h2>{props.heading}</h2>
        <div className={classes.formbasic}>
          <div className={classes.skill}>
            {props.skills.map((skill, index) => (
              <div className={classes.skillname} key={index}>
                <p>{skill.topic}</p>
                {index === loadIndex ? (
                  <Loader></Loader>
                ) : (
                  <IconButton
                    onClick={() => removeSkillHandler(skill._id, index)}
                  >
                    <CloseIcon
                      classes={{ root: classes.remove_icon }}
                    ></CloseIcon>
                  </IconButton>
                )}
              </div>
            ))}
            <div className={classes.new_skill}>
              <CssTextField
                name="newSkill"
                id="outlinedreadonlyinput"
                label="Add New Skill"
                defaultValue=""
                placeholder="Python"
                variant="outlined"
                value={skill}
                onChange={(e) => {
                  setSkill(e.target.value);
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
            <Button
              onClick={addSkillHandler}
              classes={{ root: classes.meetbutton }}
            >
              Add {props.heading}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Edit;
