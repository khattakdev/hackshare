import React, { useState, useEffect } from "react";
// import styles from './index.module.css'
import Card from "../../components/ProfileCard";
import classes from "./index.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "../../axios";

const Learners = () => {
  const [allLearners, setAllLearners] = useState([]);
  const [fetchedLearnings, setFetchedLearnings] = useState(false);

  const { getIdTokenClaims } = useAuth0();
  useEffect(() => {
    async function fetchData() {
      const token = (await getIdTokenClaims())?.__raw;

      const learnings = await axios.get("/user/learner", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      setAllLearners(learnings.data);
      setFetchedLearnings(true);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className={classes.hero_text}>Learners</h1>

      {fetchedLearnings ? (
        <div className={classes.cards}>
          {allLearners.length > 0 ? (
            allLearners.map((leaners) => <Card data={leaners} />)
          ) : (
            <p>No Experts Available</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Learners;
