import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link as NavLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
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
  return (
    <AppBar position="static">
      <Toolbar className={classes.flexContainer}>
        <div className={classes.flexContainer}>
          <Typography variant="h6">Todo</Typography>
          <Link to="/" className={classes.root} component={NavLink}>
            Home
          </Link>
          <Link to="/about" className={classes.root} component={NavLink}>
            About
          </Link>
        </div>
        <div className={classes.flexContainer}>
          <Link to="/register" className={classes.root} component={NavLink}>
            Register
          </Link>
          <Link to="/login" className={classes.root} component={NavLink}>
            Login
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
