import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Switch>
        <Header />
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Layout>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
