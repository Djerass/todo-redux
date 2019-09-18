import React, { useRef } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Button
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
  form: {
    margin: "1rem auto",
    width: "70%",
    display: "flex",
    flexDirection: "column"
  },
  item: {
    margin: "1rem 0 0 0"
  }
}));

const SignUpForm = () => {
  const classes = styles();
  const [labelWidthEmail, setlabelWidthEmail] = React.useState(0);
  const [labelWidthPassword, setlabelWidthPassword] = React.useState(0);
  const [
    labelWidthConfirmPassword,
    setlabelWidthConfirmPassword
  ] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const labelRefEmail = useRef(null);
  const labelRefPassword = useRef(null);
  const labelRefConfirmfPassword = useRef(null);
  React.useEffect(() => {
    setlabelWidthEmail(labelRefEmail.current.offsetWidth);
    setlabelWidthPassword(labelRefPassword.current.offsetWidth);
    setlabelWidthConfirmPassword(labelRefConfirmfPassword.current.offsetWidth);
  }, []);
  const submitHandler = e => {
    e.preventDefault();
    if (email && password && confirmPassword && confirmPassword === password) {
      console.log(email, password, confirmPassword);
    }
  };
  return (
    <form className={classes.form} onSubmit={e => submitHandler(e)}>
      <FormControl variant="outlined" className={classes.item}>
        <InputLabel htmlFor="component-outlined" ref={labelRefEmail}>
          Email
        </InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={email}
          labelWidth={labelWidthEmail}
          placeholder="Your Email"
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl variant="outlined" className={classes.item}>
        <InputLabel htmlFor="component-outlined2" ref={labelRefPassword}>
          Password
        </InputLabel>
        <OutlinedInput
          id="component-outlined2"
          value={password}
          labelWidth={labelWidthPassword}
          placeholder="Your Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>
      <FormControl variant="outlined" className={classes.item}>
        <InputLabel
          htmlFor="component-outlined3"
          ref={labelRefConfirmfPassword}
        >
          Confirm Pasword
        </InputLabel>
        <OutlinedInput
          id="component-outlined3"
          value={confirmPassword}
          labelWidth={labelWidthConfirmPassword}
          placeholder="Your Password"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Primary
      </Button>
    </form>
  );
};

export default SignUpForm;
