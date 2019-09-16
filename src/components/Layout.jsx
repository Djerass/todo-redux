import React from "react";
import { Container } from "@material-ui/core";

const Layout = ({ children }) => {
  return <Container maxWidth="md">{children}</Container>;
};

export default Layout;
