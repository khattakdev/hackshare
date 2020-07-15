import React,{Component} from "react";
import "./index.module.css";
import classes from "./index.module.css";

class Badges extends Component{
    render(){
        return(
            <div className = {classes.card} id = {classes.badge}>
                    <h1 className = {classes.cardtitle}>Badge</h1>
                    <div>
                        <img alt="Name Of Accomplishment" src="https://img.icons8.com/plasticine/100/000000/warranty.png"/>
                    </div>
            </div>
        )
    }
}

class Skills extends Component{
    render(){
        return(
            <div className = {classes.card} id = {classes.skills}>
                    <h1 className = {classes.cardtitle}>Skills </h1>
                    <div className = {classes.skill}>
                        <p className = {classes.skillname}>Python</p>
                        <h6>Endorsed by ABC and 5 others</h6>                            
                    </div>                    
                </div> 
        )
    }
}

class ProfileContent extends Component {
    render(){
        return(
            <div>
            <section className = {classes.cards}>
                <div className = {classes.card} >
                    <h1 className = {classes.cardtitle}>About Me</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elit nulla, convallis rhoncus neque sit amet, porta porttitor magna. Aenean suscipit urna vel ante posuere, nec pulvinar tellus facilisis. Nullam ultrices imperdiet arcu, eget iaculis enim faucibus eget. Sed nibh nibh, elementum sed finibus et, lacinia quis metus. Etiam eget hendrerit tellus. Ut accumsan tincidunt felis quis hendrerit. Curabitur auctor venenatis ante ac venenatis.</p>
                </div>               
            </section>
            <section className = {classes.cards}>
                <Badges/>
                <Skills/>
                               
        </section>
        </div>
        )
    }
}

class UpcomingMeet extends Component{
    render(){
        return(
            <div className = {classes.card}>
                    <h1 className = {classes.cardtitle} >Upcoming Meeting</h1>
                    <div className = {classes.meetings} onClick = {this.props.action}>
                        <button  className = {classes.open}>Reshedule</button>
                        <p className = {classes.meetinginfo}>Meeting with XYZ on JavaScript</p>
                        <button >Cancel</button>
                        <p className = {classes.meetingdetail}>Date: 2020/07/03</p>
                        <p className = {classes.meetingdetail}>Time: 5:30 AM</p>
                    </div> 
            </div>
        )
    }
}

class RecentMeet extends Component{
    render(){
        return(
            <div className = {classes.card}>
                    <h1 className = {classes.cardtitle}>Recent Meetings</h1>
                    <div className = {classes.meetings}>                            
                        <button >Endorse</button>
                        <p className = {classes.meetinginfo}>Meeting with XYZ on JavaScript</p>
                    </div>                    
            </div>
        )
    }
}

class Popup extends Component {
    render(){
        return(
            <div className = {classes.popupoverlay}>
                <div className = {classes.popupcontent}>
                    <button className = {classes.close} onClick = {this.props.action}><icon>Close</icon></button>
                    <form>
                        <label for="start">Date:</label>
                        <input type="date"></input>
                        <label for="start">Time:</label>
                        <input type="time"></input>
                        <input type="submit"></input>
                    </form>
                    
                </div>
            </div>
        )
    }
}

class MeetingContent extends Component {
    constructor(props) {
        super(props)
        this.ResheduleInActive = this.ResheduleInActive.bind(this)
        this.ResheduleActive = this.ResheduleActive.bind(this)
        this.state = {showRegister:false}
      }
    ResheduleInActive(){
        this.setState({...this.state,showRegister:false})
    }
    ResheduleActive(){
        this.setState({...this.state,showRegister:true})
    }
    render(){
        return(
            <div id={classes.meeting} >
                <section className = {classes.cards}>                
                <UpcomingMeet action ={this.ResheduleActive}/>
                <RecentMeet/>                     
                </section>
                {this.state.showRegister && <Popup action = {this.ResheduleInActive}/>}
            </div>
        )
    }
}

class ProfileHeader extends Component{
    render(){
        return(
            <div>
                <div className = {classes.prfileoverlay}></div>
                    <div className = {classes.intro}>
                        <div className = {classes.profileimage}>
                            <img className = {classes.bannerphoto} src="https://dummyimage.com/500/09f/fff.png" alt="Mock Name"></img>
                        </div>
                        <h1 className = {classes.bannername}>Mock Name</h1>
                    </div>
            </div>
        )
    }
}

class NavItem extends Component{
    render(){
        return(
            <li><span className = {classes.item} id = {this.props.activeProfile && "active"} onClick={this.props.action}>{this.props.children}</span></li> 
        )
    }
}

class Profile extends Component {
    constructor(props) {
        super(props)
        this.clickProfile = this.clickProfile.bind(this);
        this.clickMeeting = this.clickMeeting.bind(this);
        this.state = {activeProfile:true,isProfile: true, isMeeting:false}
      }  
    clickProfile(props){
        this.setState({...this.state,activeProfile:true,isProfile: true, isMeeting:false})  
    }
    clickMeeting(props){
        this.setState({...this.state,activeProfile:false,isProfile: false, isMeeting:true})  
    }
    render() {
      return (
        <div>  
            <ProfileHeader/> 
            <nav className = {classes.profilenav}>        
                <ul className = {classes.nav}>
                    <NavItem action={this.clickProfile} activeProfile = {this.state.activeProfile}>Profile</NavItem>
                    <NavItem action={this.clickMeeting} activeProfile = {!this.state.activeProfile}>Meeting</NavItem>
                </ul>
            </nav>
            {this.state.isMeeting && <MeetingContent/>}
            {this.state.isProfile && <ProfileContent/>}
        </div>
      )
    }
  }

export default Profile;
