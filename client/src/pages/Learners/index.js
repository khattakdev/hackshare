import React from "react";
// import styles from './index.module.css'
import Card from "../../components/ProfileCard";
import classes from "./index.module.css";
const Learners = () => {
  return (
    <>
      <h1 className={classes.hero_text}>Learners</h1>

      <div className={classes.cards}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default Learners;
