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
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Todo</Typography>
        <Link to="/" className={classes.root} component={NavLink}>
          Home
        </Link>
        <Link to="/about" className={classes.root} component={NavLink}>
          About
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
