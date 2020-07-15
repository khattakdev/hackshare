import React from 'react';
import { render } from "react-dom";
import './profile.css';

class ProfileContent extends React.Component {
    render(){
        return(
            <div id="profile">
            <section class="cards">
                <div class = "card" id = "about">
                    <h1 class="card_title">About Me</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elit nulla, convallis rhoncus neque sit amet, porta porttitor magna. Aenean suscipit urna vel ante posuere, nec pulvinar tellus facilisis. Nullam ultrices imperdiet arcu, eget iaculis enim faucibus eget. Sed nibh nibh, elementum sed finibus et, lacinia quis metus. Etiam eget hendrerit tellus. Ut accumsan tincidunt felis quis hendrerit. Curabitur auctor venenatis ante ac venenatis.</p>
                </div>               
            </section>
            <section class="cards">
                <div class = "card" id = "badge">
                    <h1 class="card_title">Badge</h1>
                    <div>
                        <img alt="Name Of Accomplishment" src="https://img.icons8.com/plasticine/100/000000/warranty.png"/>
                    </div>
                </div>
                <div class = "card" id = "skills">
                    <h1 class="card_title">Skills </h1>
                    <div class ="skill">
                        <p class="skill-name">Python</p>
                        <h6>Endorsed by ABC and 5 others</h6>                            
                    </div>                    
                </div>                
        </section>
        </div>
        )
    }
}
class Popup extends React.Component {
    render(){
        return(
            <div class="popup-overlay">
                <div class="popup-content">
                    <button class="close"><icon>Close</icon></button>
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
        this.state = {showRegister:false,showCancel: false}
      }
    CancelActive(){
        this.setState({...this.state,showCancel:true})
    }
    RegisterActive(){
        this.setState({...this.state,showRegister:true})
    }
    render(){
        return(
            <div id="meeting" >
            <section class="cards">

                <div class = "card" id = "badge">
                    <h1 class="card_title" >Upcoming Meeting</h1>
                    <div class ="meetings" onClick = {()=>this.RegisterActive()}>
                        <button  class="open">Reshedule</button>
                        <p class="meeting-info">Meeting with XYZ on JavaScript</p>
                        <button >Cancel</button>
                        <p class="meeting-detail">Date: 2020/07/03</p>
                        <p class="meeting-detail">Time: 5:30 AM</p>
                    </div> 
                </div>
                <div class = "card" id = "meeting">
                    <h1 class="card_title">Recent Meetings</h1>
                    <div class ="meetings">                            
                        <button >Endorse</button>
                        <p class="meeting-info">Meeting with XYZ on JavaScript</p>
                    </div>                    
                </div>                
        </section>
        {this.state.showRegister && <Popup/>}
        </div>
        )
    }
}


class Profile extends React.Component {
    constructor(props) {
        super(props)
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
            <section id="profile-header">
                <div class="prfile-overlay"></div>
                    <div class="intro">
                        <div class="profile-image">
                            <img id="myphoto" src="https://dummyimage.com/500/09f/fff.png" alt="Mock Name"></img>
                        </div>
                        <h1 id="myname">Mock Name</h1>
                    </div>
            </section>
            <nav class="profile-nav">        
                <ul class="nav navbar-nav navbar-left">
                    <li><a class="item" id = {this.state.activeProfile && "active"} onClick={()=>this.clickProfile()}>Profile</a></li>
                    <li><a class="item" id = {!this.state.activeProfile && "active"} onClick={()=>this.clickMeeting()}>Meeting</a></li>
                </ul>
            </nav>
            {this.state.isMeeting && <MeetingContent/>}
            {this.state.isProfile && <ProfileContent/>}
        </div>
      )
    }
  }

export default Profile;