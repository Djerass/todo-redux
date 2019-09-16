import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
    background: "#343a40",
    color: "#ffffff"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Paper
      //   style={{ background: "#343a40", color: "#ffffff", padding: "1rem" }}
      className={classes.root}
      square={true}
    >
      <Typography component="p">All rights reserved © 2019</Typography>
    </Paper>
  );
};

export default Footer;
