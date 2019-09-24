import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import InputAuth from "./InputAuth";
import { isEmail, isEmpty } from "../validator/validator";
import { sign_in } from "../store/actionCreators";
import spinner from "../images/spinner.gif";

const styles = makeStyles(() => ({
  item: {
    margin: "1rem 0"
  },
  form: {
    margin: "1rem auto",
    width: "70%",
    display: "flex",
    flexDirection: "column"
  },
  button: {
    maxWidth: "50%",
    margin: "1rem auto"
  }
}));
const SignInForm = ({ history }) => {
  const classes = styles();
  const message = useSelector(state => state.authReducer.message);
  const error = useSelector(state => state.authReducer.error);
  const loading = useSelector(state => state.authReducer.loading);
  const dispatch = useDispatch();
  // Email input
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  // Password input
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");

  if (loading) return <img src={spinner} alt="Loading..." />;
  const submitHandler = e => {
    e.preventDefault();
    if (
      isEmail(email, setEmailError) &
      isEmpty(password, "Enter password", setPasswordError)
    ) {
      dispatch(
        sign_in(email, password, () => {
          history.push("/");
        })
      );
    }
  };
  return (
    <>
      <Typography component="div" className={classes.item}>
        <Box textAlign="center" m={1}>
          {message}
        </Box>
        <Box textAlign="center" m={1}>
          {error}
        </Box>
        <Box textAlign="center" m={1}>
          {emailError}
        </Box>
        <Box textAlign="center" m={1}>
          {passwordError}
        </Box>
      </Typography>
      <form className={classes.form} onSubmit={submitHandler}>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`${classes.button}`}
        >
          Sign in
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
