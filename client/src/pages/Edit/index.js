import React, { Component } from "react";
import classes from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

const CssTextField = withStyles({
    root: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        }
    }
}
  })(TextField);

class NavItem extends Component{
    render(){
        return(
            <li><span className = {classes.item} id = {this.props.activeDetails && classes.active} onClick={this.props.action}>{this.props.children}</span></li> 
        )
    }
}

class MediaCard extends Component{
    render(){
      return(
        <div className={classes.card}>
            <div className={classes.profileimage}>
                <img
                  className={classes.bannerphoto}
                  src="https://dummyimage.com/500/09f/fff.png"
                  alt="Mock Name"
                ></img>
              </div>
              <div className={classes.profileimage}>
              <form class = {classes.formfield}>
              <CssTextField
                    id="outlinedreadonlyinput"
                    label="Profile Picture URL"
                    defaultValue="https://dummyimage.com/500/09f/fff.png"
                    variant="outlined"
                    InputLabelProps={{style: { color: "#fff" },}}
                    inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                    style={{ flex: 1, alignSelf:"center", width:600, margin: "20px 20px 20px 20px", color: "white"}}
                />
                <CssTextField
                    id="outlinedreadonlyinput"
                    label="Email id"
                    defaultValue="rashikakarki9841@gmail.com"
                    variant="outlined"
                    InputLabelProps={{style: { color: "#fff" },}}
                    inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                    style={{ flex: 1, alignSelf:"center", width:600, margin: "20px 20px 20px 20px", color: "white"}}
                />
                <CssTextField
                    id="outlinedreadonlyinput"
                    label="Linkedin Profile"
                    defaultValue="https://www.linkedin.com/in/rashikakarki/"
                    variant="outlined"
                    InputLabelProps={{style: { color: "#fff" },}}
                    inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                    style={{ flex: 1, alignSelf:"center", width:600, margin: "20px 20px 20px 20px", color: "white"}}
                />
                <CssTextField
                    id="outlinedreadonlyinput"
                    label="GitHub Profile"
                    defaultValue="https://github.com/RashikaKarki/"
                    variant="outlined"
                    InputLabelProps={{style: { color: "#fff" },}}
                    inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                    style={{ flex: 1, alignSelf:"center", width:600, margin: "20px 20px 20px 20px", color: "white"}}
                />               
                
            </form>
               
            </div>
        </div>
      )
    }
  }

  class BasicCard extends Component{
    render(){
      return(
        <div className={classes.card}>
            <form class>
            <div class = {classes.formbasic}>
              <CssTextField
                    id="outlinedreadonlyinput"
                    label="Your First Name"
                    defaultValue="RashiKa"
                    variant="outlined"
                    InputLabelProps={{style: { color: "#fff" },}}
                    inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                    style={{ flex: 1, alignSelf:"center", width:200, margin: "20px 20px 20px 20px", color: "white"}}
                />
                <CssTextField
                    id="outlinedreadonlyinput"
                    label="Your Middle Name"
                    defaultValue=" "
                    variant="outlined"
                    InputLabelProps={{style: { color: "#fff" },}}
                    inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                    style={{ flex: 1, alignSelf:"center", width:200, margin: "20px 20px 20px 20px", color: "white"}}
                />
                <CssTextField
                    id="outlinedreadonlyinput"
                    label="Your Last Name"
                    defaultValue="Karki"
                    variant="outlined"
                    InputLabelProps={{style: { color: "#fff" },}}
                    inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                    style={{ flex: 1, alignSelf:"center", width:200, margin: "20px 20px 20px 20px", color: "white"}}
                />
                </div>
                <div class = {classes.formbasic}>
                    <CssTextField
                            id="outlinedreadonlyinput"
                            label="About Me"
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elit nulla, convallis rhoncus neque sit amet, porta porttitor magna. Aenean suscipit urna vel ante posuere, nec pulvinar tellus facilisis. Nullam ultrices imperdiet arcu, eget iaculis enim faucibus eget. Sed nibh nibh, elementum sed finibus et, lacinia quis metus. Etiam eget hendrerit tellus. Ut accumsan tincidunt felis quis hendrerit. Curabitur auctor venenatis ante ac venenatis."
                            variant="outlined"
                            multiline = "true"
                            InputLabelProps={{style: { color: "#fff" },}}
                            inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                            style={{ flex: 1, alignSelf:"center", width:660,  margin: "20px 20px 20px 20px", color: "white"}}
                        />
                </div>
                <div class = {classes.formbasic}>
                    <CssTextField
                            id="outlinedreadonlyinput"
                            label="Country"
                            defaultValue="Nepal"
                            variant="outlined"
                            multiline = "true"
                            InputLabelProps={{style: { color: "#fff" },}}
                            inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                            style={{ flex: 1, alignSelf:"center", width:320,  margin: "20px 20px 20px 20px", color: "white"}}
                        />
                        <CssTextField
                            id="outlinedreadonlyinput"
                            label="Time Zone"
                            defaultValue="NPT"
                            variant="outlined"
                            multiline = "true"
                            InputLabelProps={{style: { color: "#fff" },}}
                            inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                            style={{ flex: 1, alignSelf:"center", width:320,  margin: "20px 20px 20px 20px", color: "white"}}
                        />
                        </div>
                </form>
            
        </div>
      )
    }
  }

class EditDetails extends Component {
    render() {
      return (
        <div>
            <div className={classes.cards}>
            <MediaCard/>
            <BasicCard/>         
            </div>
            <div className = {classes.submitbutton}>
            <Button classes={{ root: classes.meetbutton }}>Submit</Button>
            </div>
        </div>
      );
    }
  }

  class SubmitForm extends React.Component {
    state = { term: "" };  handleSubmit = (e) => {
      e.preventDefault();
      if(this.state.term === "") return;
      this.props.onFormSubmit(this.state.term);
      this.setState({ term: "" });
    }  
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <input
            style = {{width:400,height:30}} 
            type="text"
            className={classes.input}
            placeholder="Enter Item"
            value={this.state.term}
            onChange={(e) => this.setState({term: e.target.value})}
          />
          <button className={classes.button}>Submit</button>
        </form>
      );
    }
  }

  const Skill = (props) => {
    return(
        <div>
        <button className={classes.delete} onClick={() => {props.onDelete(props.id)}}><CloseOutlinedIcon color="disabled"/></button>
        <div className={classes.listitem}>
            <div className={classes.skillnamecontainer}>
                <p className={classes.skillname}>{props.content}</p>
            </div>
        </div>
      </div>
    );
  }

  const SkillsList = (props) => {
    
    const skills = props.allskill.map((skills, index) => {
        return <Skill content={skills} key={index} id={index} onDelete={props.onDelete} />
    })
    return( 
      <div className={classes.listwrapper}>
        {skills}
      </div>
    );
  }

  class LearnerCard extends Component{
    constructor(props){
        super(props);
        this.state = { allskill: ["Python", "JavaScript", "Java"] };
      }
    handleDelete = (index) => {
        const newArr = [...this.state.allskill];
        newArr.splice(index, 1);
        this.setState({allskill: newArr});
    }
    handleSubmit = oneskill => {
        this.setState({allskill: [...this.state.allskill, oneskill]});
    }
    render(){
      return(
        <div className={classes.card}>
            <div className={classes.header}>
                <h1 className={classes.cardheadertitle}>
                    Learner
                </h1>
            </div>
            <SkillsList allskill={this.state.allskill} onDelete={this.handleDelete} />
            <SubmitForm className={classes.submitform} onFormSubmit={this.handleSubmit} />
        </div>
)}}

class ExpertiseCard extends Component{
    constructor(props){
        super(props);
        this.state = { allskill: ["React", "Julia", "Node"] };
      }
    handleDelete = (index) => {
        const newArr = [...this.state.allskill];
        newArr.splice(index, 1);
        this.setState({allskill: newArr});
    }
    handleSubmit = oneskill => {
        this.setState({allskill: [...this.state.allskill, oneskill]});
    }
    render(){
      return(
        <div className={classes.card}>
            <div className={classes.header}>
                <h1 className={classes.cardheadertitle}>
                    Expertise
                </h1>
            </div>
            <SkillsList allskill={this.state.allskill} onDelete={this.handleDelete} />
            <SubmitForm className={classes.submitform} onFormSubmit={this.handleSubmit} />
        </div>
)}}


  class EditSkills extends Component {
    render() {
      return (
        <div className={classes.cards}>
          <ExpertiseCard/>
          <LearnerCard/>         
        </div>
      );
    }
  }


class Edit extends Component { 
    constructor(props){
        super(props)
        this.clickDetails = this.clickDetails.bind(this);
        this.clickSkill = this.clickSkill.bind(this);
        this.state = {activeDetails:true,isDetails: true, isSkill:false}
    }  
    clickDetails(props){
        this.setState({activeDetails:true,isDetails: true, isSkill:false})  
    }
    clickSkill(props){
        this.setState({activeDetails:false,isDetails: false, isSkill:true})  
    }
    render() {
      return (
        <div>
            <nav className = {classes.profilenav}>        
                <ul className = {classes.nav}>
                    <NavItem action={this.clickDetails} activeDetails= {this.state.activeDetails}>Edit Personal Details</NavItem>
                    <NavItem action={this.clickSkill} activeDetails = {!this.state.activeDetails}>Edit Skills</NavItem>
                </ul>
            </nav>
            {this.state.isDetails && <EditDetails/>}
            {this.state.isSkill && <EditSkills/>}
        </div>
    );
  }
}

export default Edit;