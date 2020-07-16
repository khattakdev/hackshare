import React, { Component } from "react";
import "./index.module.css";
import classes from "./index.module.css";
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

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

class Skills extends Component {
  render() {
    return (
      <div className={classes.card} id={classes.skills}>
        <p className={classes.cardtitle}>Skills </p>
        <div className={classes.skill}>
          <p className={classes.skillname}>Python</p>
          <h6>Endorsed by ABC and 5 others</h6>
        </div>
      </div>
    );
  }
}

class ProfileContent extends Component {
  render() {
    return (
      <div>
        <section className={classes.cards}>
          <div className={classes.card}>
            <p className={classes.cardtitle}>About Me</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              elit nulla, convallis rhoncus neque sit amet, porta porttitor
              magna. Aenean suscipit urna vel ante posuere, nec pulvinar tellus
              facilisis. Nullam ultrices imperdiet arcu, eget iaculis enim
              faucibus eget. Sed nibh nibh, elementum sed finibus et, lacinia
              quis metus. Etiam eget hendrerit tellus. Ut accumsan tincidunt
              felis quis hendrerit. Curabitur auctor venenatis ante ac
              venenatis.
            </p>
          </div>
        </section>
        <section className={classes.cards}>
          <Badges />
          <Skills />
        </section>
      </div>
    );
  }
}

class UpcomingMeet extends Component {
  render() {
    return (
      <div className={classes.card}>
        <p className={classes.cardtitle}>Upcoming Meeting</p>
        <div className={classes.meetings} >
        <Button color="primary" className={classes.open} classes={{ root: classes.meetbutton }} onClick={this.props.action}>Reshedule</Button> 
          <p className={classes.meetinginfo}>Meeting with XYZ on JavaScript</p>                   
          <p className={classes.meetingdetail}>Date: 2020/07/03</p>
          <Button color="primary" className={classes.cancelmeet} classes={{ root: classes.meetbutton }}>Cancel</Button>
          <p className={classes.meetingdetail} >Time: 5:30 AM</p>
        </div>
      </div>
    );
  }
}

class RecentMeet extends Component {
  render() {
    return (
      <div className={classes.card}>
        <p className={classes.cardtitle}>Recent Meetings</p>
        <div className={classes.meetings}>
          <Button>Endorse</Button>
          <p className={classes.meetinginfo}>Meeting with XYZ on JavaScript</p>
        </div>
      </div>
    );
  }
}

class Popup extends Component {
  render() {
    return (
      <div className={classes.popupoverlay}>
        <div className={classes.popupcontent}>
          <EventAvailableIcon style={{ fontSize: 80, margin: 20}}/>
          <form>

            <div class={classes.datatime}>
                <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue="2020-07-1"
                style = {{width:300}}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div class={classes.datatime}>
                <TextField
                  id="time"
                  label="Time"
                  type="time"
                  defaultValue="07:30"
                  style = {{width:300}}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                }}/>
              </div>
              <br/>
            <Button className={classes.close} onClick={this.props.action}>Close</Button>  
            <Button>Send Request</Button>                    
          </form>
        </div>
      </div>
    );
  }
}

class MeetingContent extends Component {
  constructor(props) {
    super(props);
    this.ResheduleInActive = this.ResheduleInActive.bind(this);
    this.ResheduleActive = this.ResheduleActive.bind(this);
    this.state = { showRegister: false };
  }
  ResheduleInActive() {
    this.setState({ showRegister: false });
  }
  ResheduleActive() {
    this.setState({ showRegister: true });
  }
  render() {
    return (
      <div id={classes.meeting}>
        <section className={classes.cards}>
          <UpcomingMeet action={this.ResheduleActive} />
          <RecentMeet />
        </section>
        {this.state.showRegister && <Popup action={this.ResheduleInActive} />}
      </div>
    );
  }
}

class ProfileHeader extends Component {
  render() {
    return (
      <div>
        <div className={classes.intro}>
          <div className={classes.profileimage}>
            <img
              className={classes.bannerphoto}
              src="https://dummyimage.com/500/09f/fff.png"
              alt="Mock Name"
            ></img>
          </div>
          <p className={classes.bannername}>Mock Name</p>
        </div>
      </div>
    );
  }
}

class NavItem extends Component {
  render() {
    return (
      <li>
        <span
          className={classes.item}
          id={this.props.activeProfile && classes.active}
          onClick={this.props.action}
        >
          {this.props.children}
        </span>
      </li>
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.clickProfile = this.clickProfile.bind(this);
    this.clickMeeting = this.clickMeeting.bind(this);
    this.state = { activeProfile: true, isProfile: true, isMeeting: false };
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
  render() {
    return (
      <div>
        <ProfileHeader />
        <nav className={classes.profilenav}>
          <ul className={classes.nav}>
            <NavItem
              action={this.clickProfile}
              activeProfile={this.state.activeProfile}
            >
              Profile
            </NavItem>
            <NavItem
              action={this.clickMeeting}
              activeProfile={!this.state.activeProfile}
            >
              Meeting
            </NavItem>
          </ul>
        </nav>
        {this.state.isMeeting && <MeetingContent />}
        {this.state.isProfile && <ProfileContent />}
      </div>
    );
  }
}

export default Profile;
