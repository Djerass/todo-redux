import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Box } from "@material-ui/core/";
import InputAuth from "./InputAuth";
import { makeStyles } from "@material-ui/core/styles";
import * as validator from "../validator/validator";
import { sign_up } from "../store/actionCreators";
import spinner from "../images/spinner.gif";

const styles = makeStyles(() => ({
  form: {
    margin: "1rem auto",
    width: "70%",
    display: "flex",
    flexDirection: "column"
  },
  item: {
    margin: "1rem 0 0 0"
  },
  button: {
    maxWidth: "50%",
    margin: "1rem auto"
  }
}));

const SignUpForm = ({ history }) => {
  const classes = styles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.authReducer.error);
  const loading = useSelector(state => state.authReducer.loading);

  // Email input
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  // Password input
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  // Confirm password input
  const [confirmError, setConfirmError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  if (loading) return <img src={spinner} alt="Loading..." />;
  const submitHandler = e => {
    e.preventDefault();
    setConfirmError("");
    setPasswordError("");
    setEmailError("");
    if (
      validator.isEmail(email, setEmailError) &
      validator.isPassword(password, setPasswordError) &
      validator.isEqual(password, confirmPassword, setConfirmError)
    ) {
      dispatch(sign_up(email, password, () => history.push("/login")));
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <>
      <Typography component="div" className={classes.item}>
        <Box textAlign="center" m={1}>
          {error}
        </Box>
        <Box textAlign="center" m={1}>
          {emailError}
        </Box>
        <Box textAlign="center" m={1}>
          {passwordError}
        </Box>
        <Box textAlign="center" m={1}>
          {confirmError}
        </Box>
      </Typography>
      <form className={classes.form} onSubmit={e => submitHandler(e)}>
        <InputAuth
          styleClass={classes.item}
          change={setEmail}
          value={email}
          label="Email"
          placeholder="Enter your email"
          errorText={emailError}
          type="email"
        />
        <InputAuth
          styleClass={classes.item}
          change={setPassword}
          value={password}
          label="Password"
          placeholder="Enter your password"
          errorText={passwordError}
          type="password"
        />
        <InputAuth
          styleClass={classes.item}
          change={setConfirmPassword}
          value={confirmPassword}
          label="Confirm password"
          placeholder="Confirm your password"
          errorText={confirmError}
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`${classes.button}`}
        >
          Sign up
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
