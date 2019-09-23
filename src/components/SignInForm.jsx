import React, { useState } from "react";
import { useSelector } from "react-redux";
import auth from "../auth/auth";
import { Typography, Box } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
const styles = makeStyles(() => ({
  item: {
    margin: "1rem 0 0 0"
  }
}));
const SignInForm = props => {
  const [isAuth, setAuth] = useState(auth.isAuthenticated());
  const classes = styles();
  const message = useSelector(state => state.authReducer.message);
  return (
    <div>
      <Typography component="div" className={classes.item}>
        <Box textAlign="center" m={1}>
          {message}
        </Box>
      </Typography>
      {!isAuth ? (
        <button
          onClick={() => {
            auth.login(() => {
              props.history.push("/");
              setAuth(true);
            });
          }}
        >
          Sign In
        </button>
      ) : (
        <button
          onClick={() => {
            auth.logout(() => {});
            setAuth(false);
          }}
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default SignInForm;
