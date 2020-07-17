import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "../../components/ProfileCard";
import Loader from "../../components/Loader";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "../../axios";

const useStyles = makeStyles(() => ({
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
    <div className={classes.searchbar}>
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

const Experts = () => {
  const [allExpertise, setAllExpertise] = useState([]);
  const [fetchedExpertise, setFetchedExpertise] = useState(false);

  const { getIdTokenClaims } = useAuth0();
  useEffect(() => {
    async function fetchData() {
      const token = (await getIdTokenClaims())?.__raw;

      const expertise = await axios.get("/user/expert", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      setAllExpertise(expertise.data);
      setFetchedExpertise(true);
    }
    fetchData();
  }, [getIdTokenClaims]);

  return (
    <div className={classes.expert}>
      <h1 className={classes.hero_text}>Experts</h1>
      <div className={classes.searchbar}>
        <ControllableStates />
      </div>
      <br />
      {fetchedExpertise ? (
        <div className={classes.cards}>
          {allExpertise.length > 0 ? (
            allExpertise.map((expertise) => (
              <Card key={expertise._id} expert data={expertise} />
            ))
          ) : (
            <p>No Experts Available</p>
          )}
        </div>
      ) : (
        <div className={classes.loadercontainer}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Experts;
