import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TextField from "@material-ui/core/TextField";
import axios from "../../axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import styles from "./index.module.css";

const Register = ({ onClose, open }) => {
  const { logout, getIdTokenClaims } = useAuth0();
  const [claims, setClaims] = useState({});
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const handleClose = () => {
    onClose();
  };

  const handleChange = (changer) => (event) => {
    changer(event.target.value);
  };

  useEffect(() => {
    const getClaims = async () => {
      const res = await getIdTokenClaims();
      if (res) {
        setClaims(res);
        setEmail(res.email);
      }
    };
    getClaims();
  }, [getIdTokenClaims]);

  const submitData = async () => {
    const data = {
      email: email,
      timeZone: `GMT +${timezone}`,
      countryCode: country,
    };
    const res = await axios.post("/user/register", {
      data,
      headers: {
        Authorization: `Bearer ${claims.__raw}`,
      },
    });
    if (res.status === 200) handleClose();
  };

  return (
    <Dialog open={open} classes={{ paper: styles.root }}>
      <DialogTitle>Register Account</DialogTitle>
      <DialogContent classes={{ root: styles.content }}>
        <DialogContentText>Please Verify your information</DialogContentText>
        <TextField
          autoFocus
          margin="normal"
          id="name"
          label="Email Address"
          type="email"
          variant="outlined"
          value={email}
          onChange={handleChange(setEmail)}
        />
        <br />
        <TextField
          id="country"
          margin="normal"
          label="Country"
          type="string"
          variant="outlined"
          value={country}
          onChange={handleChange(setCountry)}
        />
        <br />
        <TextField
          id="time"
          margin="normal"
          label="Timezone"
          type="string"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                classes={{ positionStart: styles.adornment }}
              >
                GMT +
              </InputAdornment>
            ),
          }}
          value={timezone}
          onChange={handleChange(setTimezone)}
        />
      </DialogContent>
      <DialogActions classes={{ root: styles.actions }}>
        <Button onClick={logout} color="primary">
          Cancel
        </Button>
        <Button onClick={submitData} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Register;
