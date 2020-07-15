import React from 'react';
import './index.css';

class Badges extends React.Component{
    render(){
        return(
            <div class = "card" id = "badge">
                    <h1 class="card-title">Badge</h1>
                    <div>
                        <img alt="Name Of Accomplishment" src="https://img.icons8.com/plasticine/100/000000/warranty.png"/>
                    </div>
            </div>
        )
    }
}

class Skills extends React.Component{
    render(){
        return(
            <div class = "card" id = "skills">
                    <h1 class="card-title">Skills </h1>
                    <div class ="skill">
                        <p class="skill-name">Python</p>
                        <h6>Endorsed by ABC and 5 others</h6>                            
                    </div>                    
                </div> 
        )
    }
}

class ProfileContent extends React.Component {
    render(){
        return(
            <div id="profile">
            <section class="cards">
                <div class = "card" id = "about">
                    <h1 class="card-title">About Me</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elit nulla, convallis rhoncus neque sit amet, porta porttitor magna. Aenean suscipit urna vel ante posuere, nec pulvinar tellus facilisis. Nullam ultrices imperdiet arcu, eget iaculis enim faucibus eget. Sed nibh nibh, elementum sed finibus et, lacinia quis metus. Etiam eget hendrerit tellus. Ut accumsan tincidunt felis quis hendrerit. Curabitur auctor venenatis ante ac venenatis.</p>
                </div>               
            </section>
            <section class="cards">
                <Badges/>
                <Skills/>
                               
        </section>
        </div>
        )
    }
}

class UpcomingMeet extends React.Component{
    render(){
        return(
            <div class = "card" id = "upcoming-meeting">
                    <h1 class="card-title" >Upcoming Meeting</h1>
                    <div class ="meetings" onClick = {this.props.action}>
                        <button  class="open">Reshedule</button>
                        <p class="meeting-info">Meeting with XYZ on JavaScript</p>
                        <button >Cancel</button>
                        <p class="meeting-detail">Date: 2020/07/03</p>
                        <p class="meeting-detail">Time: 5:30 AM</p>
                    </div> 
            </div>
        )
    }
}

class RecentMeet extends React.Component{
    render(){
        return(
            <div class = "card" id = "recent-meeting">
                    <h1 class="card-title">Recent Meetings</h1>
                    <div class ="meetings">                            
                        <button >Endorse</button>
                        <p class="meeting-info">Meeting with XYZ on JavaScript</p>
                    </div>                    
            </div>
        )
    }
}

class Popup extends React.Component {
    render(){
        return(
            <div class="popup-overlay">
                <div class="popup-content">
                    <button class="close" onClick = {this.props.action}><icon>Close</icon></button>
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

class MeetingContent extends React.Component {
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
            <div id="meeting" >
            <section class="cards">                
            <UpcomingMeet action ={this.ResheduleActive}/>
            <RecentMeet/>                     
            </section>
            {this.state.showRegister && <Popup action = {this.ResheduleInActive}/>}
            </div>
        )
    }
}

class ProfileHeader extends React.Component{
    render(){
        return(
            <div id="profile-header">
                <div class="prfile-overlay"></div>
                    <div class="intro">
                        <div class="profile-image">
                            <img id="myphoto" src="https://dummyimage.com/500/09f/fff.png" alt="Mock Name"></img>
                        </div>
                        <h1 id="myname">Mock Name</h1>
                    </div>
            </div>
        )
    }
}

class NavItem extends React.Component{
    render(){
        return(
            <li><a class="item" id = {this.props.activeProfile && "active"} onClick={this.props.action}>{this.props.children}</a></li> 
        )
    }
}

class Profile extends React.Component {
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
            <nav class="profile-nav">        
                <ul class="nav navbar-nav navbar-left">
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