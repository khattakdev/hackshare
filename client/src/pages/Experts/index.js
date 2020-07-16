import React,{Component} from "react";
import classes from './index.module.css'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    }
  },
}
));

const skills = ["Python","JavaScript","Java","Julia","C++","React","Django","Node"];

function ControllableStates() {
  const classes = useStyles();
  const [value, setValue] = React.useState(skills[0]);
  const [inputValue, setInputValue] = React.useState('');
    return (
        <div class={classes.searchbar}>
          <Autocomplete
          classes={classes}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={skills}
          style={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Search by Skills" InputLabelProps={{style: { color: '#fff' },}} margin="normal" variant="outlined" />
          }
        />
    </div>
    
  );
        }

class SkillCard extends Component{
  render(){
    return(
      <div className={classes.card}>
          <div>
            <div className={classes.intro}>
              <div className={classes.profileimage}>
                <img
                  className={classes.bannerphoto}
                  src="https://dummyimage.com/500/09f/fff.png"
                  alt="Mock Name"
                ></img>
              </div>
              <p className={classes.bannername}>Rashika Karki</p>
              <div className = {classes.bannerdetail}>
                <p>
                  Endorsed by Syne and 4 others
                </p>
                <Button classes={{ root: classes.meetingrequest }} variant="outlined">
                  Request
                </Button>
              </div>
            </div>
          </div>
          </div>
    )
  }
}
class Experts extends Component {
  
  render(){
    return(
      <div className = {classes.expert}>
        <div className={classes.searchbar}>
          <ControllableStates/>
        </div>
        <br/>
        <div className={classes.cards}>
          <SkillCard/>
          <SkillCard/>
          <SkillCard/>
          <SkillCard/>          
        </div>             
      </div>
    );      
  }
  
}

export default Experts;
