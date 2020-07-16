import React, { Component, useEffect, useState } from "react";
import classes from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "../../axios";
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

const skills = [
  "All",
  "Python",
  "JavaScript",
  "Java",
  "Julia",
  "C++",
  "React",
  "Django",
  "Node",
];

function ControllableStates() {
  const classes = useStyles();
  const [value, setValue] = useState(skills[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div class={classes.searchbar}>
      <Autocomplete
        classes={classes}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={skills}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by Skills"
            InputLabelProps={{ style: { color: "#fff" } }}
            margin="normal"
            variant="outlined"
          />
        )}
      />
    </div>
  );
}

class SkillCard extends Component {
  render() {
    const exp = this.props.expertise;
    return (
      <div className={classes.card}>
        <div>
          <div className={classes.intro}>
            <div className={classes.profileimage}>
              <img
                className={classes.bannerphoto}
                src={exp.photo}
                alt="Mock Name"
              ></img>
            </div>
            <p className={classes.bannername}>{exp.name}</p>
            <div className={classes.bannerdetail}>
              <p>Endorsed by Syne and 4 others</p>
              <Button
                classes={{ root: classes.meetingrequest }}
                variant="outlined"
              >
                Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Experts = () => {
  const [allExpertise, setAllExpertise] = useState([]);
  const { getIdTokenClaims } = useAuth0();
  useEffect(async () => {
    const token = (await getIdTokenClaims()).__raw;

    axios.get("/expertise", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    });
  }, []);

  return (
    <div className={classes.expert}>
      <div className={classes.searchbar}>
        <ControllableStates />
      </div>
      <br />
      <div className={classes.cards}>
        {allExpertise.length > 0 ? (
          allExpertise.map((expertise) => <SkillCard />)
        ) : (
          <p>No Experts Available</p>
        )}
        {/* <SkillCard />
        <SkillCard />
        <SkillCard /> */}
      </div>
    </div>
  );
};

export default Experts;
