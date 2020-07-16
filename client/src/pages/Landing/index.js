import React from "react";
import styles from "./index.module.css";
import { useAuth0 } from "@auth0/auth0-react";

import { ReactComponent as Illustration1 } from "../../assets/illustrations/Landing-Shared.svg";
import { ReactComponent as Illustration2 } from "../../assets/illustrations/Profile-Skills.svg";
import { ReactComponent as Illustration3 } from "../../assets/illustrations/Welcoming.svg";
import { Button } from "@material-ui/core";

const landingSections = [
  {
    header: "Teach to Learn, Learn to Teach",
    body:
      "Teaching something is the best way to truely understand it. HackShare helps you find people to learn from and teach. Expand your expertise today.",
    button: true,
    illustrationComponent: Illustration1,
  },
  {
    header: "Show your strengths, Prove your skills",
    body:
      "HackShare lets you add skills you are confident with as 'courses' others can ask you to teach them. You can also add challenges related to your 'courses' that others can show you in order to prove their learning.",
    illustrationComponent: Illustration2,
  },
  {
    header: "Meet new people, Learn something new",
    body:
      "Add skills you're interested in learning to your profile so people can know how to give back. Once a meeting has been made, enjoy meeting and learning from someone new.",
    illustrationComponent: Illustration3,
  },
];

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      classes={{ root: styles.button }}
      variant="contained"
      onClick={loginWithRedirect}
    >
      Get Started
    </Button>
  );
};

const renderSections = landingSections.map((section, i) => {
  const Illustration = section.illustrationComponent;
  return (
    <div className={styles.section} key={i}>
      {i % 2 === 0 && (
        <Illustration className={styles.illustration}/>
      )}
      <div className={styles.textblock}>
        <h2 className={styles.textheader}>{section.header}</h2>
        <p className={styles.textbody}>{section.body}</p>
        {section.button && <LoginButton />}
      </div>
      {i % 2 !== 0 && (
        <Illustration className={styles.illustration}/>
      )}
    </div>
  );
});

const Landing = () => {
  return <div className={styles.container}>{renderSections}</div>;
};

export default Landing;
