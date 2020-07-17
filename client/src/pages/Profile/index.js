import React, { Component } from "react";
import classes from "./index.module.css";
import Loader from "../../components/Loader";
import Button from "@material-ui/core/Button";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TodayIcon from "@material-ui/icons/Today";
import TextField from "@material-ui/core/TextField";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import Tooltip from "@material-ui/core/Tooltip";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import axiosInstance from "../../axios";
import { withAuth0 } from "@auth0/auth0-react";

class Badges extends Component {
  render() {
    return (
      <div className={classes.card} id={classes.badge}>
        <p className={classes.cardtitle}>Badge</p>
        <div>
          <img
            alt="Name Of Accomplishment"
            src="https://img.icons8.com/plasticine/100/000000/warranty.png"
          />
        </div>
      </div>
    );
  }
}

const Skills = (props) => {
  return (
    <div className={classes.card} id={classes.skills}>
      <p className={classes.cardtitle}>Skills </p>
      <div className={classes.skill}>
        {props.skills.map((skill, index) => (
          <p id={index} className={classes.skillname}>
            {skill}
          </p>
        ))}
      </div>
    </div>
  );
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.clickProfile = this.clickProfile.bind(this);
    this.clickMeeting = this.clickMeeting.bind(this);
    this.state = {
      activeProfile: true,
      isProfile: true,
      isMeeting: false,
      profileData: undefined,
      userSkills: undefined,
    };
  }
  clickProfile(props) {
    this.setState({
      activeProfile: true,
      isProfile: true,
      isMeeting: false,
    });
  }
  clickMeeting(props) {
    this.setState({
      activeProfile: false,
      isProfile: false,
      isMeeting: true,
    });
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    const { getIdTokenClaims } = this.props.auth0;

    async function returnData() {
      const token = (await getIdTokenClaims())?.__raw;

      if (params.id) {
        return (
          await axiosInstance.get(`/user/${params.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
            },
          })
        ).data;
      } else {
        return (
          await axiosInstance.get(`/user/whoami`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
            },
          })
        ).data.responseData;
      }
    }

    async function fetchUserSkills(id) {
      const token = (await getIdTokenClaims())?.__raw;
      return await axiosInstance.get(`/expertise/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    returnData().then(async (res) => {
      const skills = (await fetchUserSkills(res._id)).data.msg.map((exp) => {
        return exp.topic;
      });

      this.setState({
        profileData: res,
        userSkills: skills,
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.profileData ? (
          <>
            <div>
              <div className={classes.intro}>
                <div className={classes.profileimage}>
                  <img
                    className={classes.bannerphoto}
                    src={this.state.profileData.picture}
                    alt={this.state.profileData.name}
                  ></img>
                </div>
                <p className={classes.bannername}>
                  {this.state.profileData.name}
                </p>
              </div>
              <div className={classes.links}>
                <Tooltip title={this.state.profileData.timeZone}>
                  <AccessTimeIcon />
                </Tooltip>
                {this.state.profileData.socialLink && (
                  <a
                    href={this.state.profileData.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Tooltip title="Contact Link">
                      <TodayIcon />
                    </Tooltip>
                  </a>
                )}
                <Tooltip title={this.state.profileData.email}>
                  <MailOutlineIcon />
                </Tooltip>
              </div>
            </div>
            <div>
              <section className={classes.cards}>
                <div className={classes.card}>
                  <p className={classes.cardtitle}>Basic Information</p>
                  <div className={classes.infos}>
                    <p>
                      <span>Time Zone:</span> {this.state.profileData.timeZone}
                    </p>
                    <p>
                      <a href={`mailto:${this.state.profileData.email}`}>
                        <Button
                          color="primary"
                          className={classes.open}
                          classes={{ root: classes.meetbutton }}
                          onClick={this.props.action}
                        >
                          Email
                        </Button>
                      </a>
                    </p>
                    <p>
                      <a href={this.state.profileData.socialLink}>
                        <Button
                          color="primary"
                          className={classes.open}
                          classes={
                            this.state.profileData.socialLink
                              ? { root: classes.meetbutton }
                              : { root: classes.disable_btn }
                          }
                          onClick={this.props.action}
                        >
                          Meeting Request
                        </Button>
                      </a>
                    </p>
                  </div>
                </div>
              </section>
              <section className={classes.cards}>
                {this.state.userSkills.length > 0 ? (
                  <Skills skills={this.state.userSkills} />
                ) : (
                  <p>No Skills</p>
                )}
              </section>
            </div>
          </>
        ) : (
          <div className={classes.loadercontainer}>
            <Loader />
          </div>
        )}
      </div>
    );
  }
}

export default withAuth0(Profile);
