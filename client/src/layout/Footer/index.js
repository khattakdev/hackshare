import React from "react";

import GitHubIcon from "@material-ui/icons/GitHub";

import styles from "./index.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/ekhattak/hackshare"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon></GitHubIcon>
      </a>
    </footer>
  );
};

export default Footer;
