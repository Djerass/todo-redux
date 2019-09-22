import React, { useState } from "react";
import { Button, Typography, Box } from "@material-ui/core/";
import InputAuth from "./InputAuth";
import { makeStyles } from "@material-ui/core/styles";
import * as validator from "../validator/validator";

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

const SignUpForm = () => {
  const classes = styles();
  // Email input
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  // Password input
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  // Confirm password input
  const [confirmError, setConfirmError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      console.log(email, password);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <>
      <Typography component="div" className={classes.item}>
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
