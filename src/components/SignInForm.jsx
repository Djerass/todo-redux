import React, { useState } from "react";
import auth from "../auth/auth";

const SignInForm = props => {
  const [isAuth, setAuth] = useState(auth.isAuthenticated());
  return (
    <div>
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
