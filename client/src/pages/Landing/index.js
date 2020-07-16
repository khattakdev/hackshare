import React from "react";
import styles from "./index.module.css";
import { ReactComponent as Illustration1 } from "../../assets/illustrations/Landing-Shared.svg";

const landingSections = [
  {
    header: "Teach to Learn, Learn to Teach",
    body:
      "Teaching something is the best way to truely understand it. HackShare helps you find people to learn from and teach. Expand your expertise today.",
    button: {
      clickaction: "",
      text: "Get Started",
    },
    illustrationComponent: Illustration1,
  },
];

const renderSections = landingSections.map((section, i) => {
  const Illustration = section.illustrationComponent;
  return (
    <div key={i}>
      <Illustration className={styles.illustration}></Illustration>
    </div>
  );
});

const Landing = () => {
  return <>{renderSections}</>;
};

export default Landing;
