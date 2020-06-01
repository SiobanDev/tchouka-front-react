import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

class Home extends Component {
  render() {
    return (
      <>
        <h1>HELLO !</h1>
        <p>Welcome to our Body Percussion App created with love !</p>
        <p>
          Follow the steps to be able to create your own percussion tutorial.
        </p>
        <p>We hope you enjoy.</p>
        <Link to="/rythme">Start</Link>
      </>
    );
  }
}

export default Home;
