import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, Box, Button } from "@material-ui/core/";
import { useSelector } from "react-redux";
import { Link as NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
    color: "#ffffff"
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline"
  }
}));

const Header = () => {
  const classes = useStyles();
  const email = useSelector(state => state.authReducer.email);
  let left;
  if (email) {
    left = (
      <div className={classes.flexContainer}>
        <Typography variant="h6">
          <Box textAlign="center" m={1}>
            {email}
          </Box>
        </Typography>
        <Button style={{ color: "#ffffff" }} className={classes.button}>
          Logout
        </Button>
      </div>
    );
  } else {
    left = (
      <div className={classes.flexContainer}>
        <Button to="/register" className={classes.root} component={NavLink}>
          Register
        </Button>
        <Button to="/login" className={classes.root} component={NavLink}>
          Login
        </Button>
      </div>
    );
  }
  return (
    <AppBar position="static">
      <Toolbar className={classes.flexContainer}>
        <div className={classes.flexContainer}>
          <Typography variant="h6">Todo</Typography>
          <Button to="/" className={classes.root} component={NavLink}>
            Home
          </Button>
          <Button to="/about" className={classes.root} component={NavLink}>
            About
          </Button>
        </div>
        {left}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
