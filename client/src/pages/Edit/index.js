import React, { Component } from "react";
import classes from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/Close";

const CssTextField = withStyles({
    root: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        }
    }
}
  })(TextField);

class SocialCard extends Component{
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
              <form class>
            <div class = {classes.formbasic}>
              <CssTextField
                    id="outlinedreadonlyinput"
                    label="Calendly"
                    defaultValue="Dummy Value"
                    variant="outlined"
                    InputLabelProps={{style: { color: "#fff" },}}
                    inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                    style={{ flex: 1, alignSelf:"center", width:550, margin: "20px 20px 20px 20px", color: "white"}}
                />
                <CssTextField
                    id="outlinedreadonlyinput"
                    label="Time Zone"
                    defaultValue="NPT"
                    variant="outlined"
                    InputLabelProps={{style: { color: "#fff" },}}
                    inputProps={{ style: { fontFamily: "Arial", color: "white"}}}
                    style={{ flex: 1, alignSelf:"center", width:300, margin: "20px 20px 20px 20px", color: "white"}}
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
        <div className={classes.cards}>
            <SocialCard/>       
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
            type="text"
            className={classes.input}
            placeholder="Enter Item"
            value={this.state.term}
            onChange={(e) => this.setState({term: e.target.value})}
          />
          <button className={classes.button}>Add</button>
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
    render() {
      return (
        <div>
            <EditDetails/>
            <EditSkills/>
            <div className = {classes.submitbutton}>
                <Button classes={{ root: classes.meetbutton }}>Submit</Button>
            </div>
        </div>
    );
  }
}

export default Edit;