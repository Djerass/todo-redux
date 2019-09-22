import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import { ProtectedRoute } from "./components/Protected.route";

function App() {
  return (
    <div className="App">
      <Switch>
        <Header />
        <Layout>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/register" component={SignUpForm} />
          <Route exact path="/login" component={SignInForm} />
          <Route exact path="/about" component={About} />
        </Layout>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
