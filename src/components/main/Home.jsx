import React, { Component } from "react";
import {Link } from "react-router-dom";
import "./Home.css";
 
class Home extends Component {
  render() {
    return (
      <div>
        <h1>HELLO !</h1>
        <p>Welcome to our Body Percussion App created with love</p>
        <p>Follow the steps to be able to create your own percussion</p>
        <p>We hope you enjoy.</p>
        <Link to="/rythme"><h3>Start</h3></Link>
      </div>
    );
  }
}
 
export default Home;