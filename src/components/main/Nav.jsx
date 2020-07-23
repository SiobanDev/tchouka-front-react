import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavStyle.scss";
import { updateNavIconStyle } from "./Nav.service";
import StepContext from "../../context/StepContext";

const Nav = () => {
  const stepContext = useContext(StepContext);

  let iconElements = [];

  let linkElements = [];
  const itemNameMenuList = [
    "ACCUEIL",
    "RYTHME",
    "PERCUSSIONS",
    "APPRENTISSAGE",
  ];
  const urlMenuList = ["/", "/rythme", "/percussions", "/apprentissage"];

  useEffect(() => {
    updateNavIconStyle(stepContext.currentStep);
  }, [stepContext.currentStep]);

  for (let i = 1; i < itemNameMenuList.length; i++) {
    iconElements.push(
      <React.Fragment key={i}>
        <li className="line">
          <hr color="#2CA4A0" />
        </li>
        <li id={`navbar-element-${i}`} className="navbar-element">
          <span className="round-icon menu-icon">{i}</span>
        </li>
      </React.Fragment>
    );
  }

  for (let i = 1; i < itemNameMenuList.length; i++) {
    linkElements.push(
      <li id={`navbar-step${i}`} className="navbar-element" key={i}>
        <Link
          className="navbar-link"
          to={urlMenuList[i]}
          onClick={() => {
            stepContext.setCurrentStep(i);
          }}
        >
          {itemNameMenuList[i]}
        </Link>
      </li>
    );
  }

  return (
    <nav role="navigation">
      <ul id="icon-menu" className="navbar-menu">
        <li id="navbar-element-0" className="navbar-element">
          <span className="fas fa-home round-icon menu-icon"></span>
        </li>
        {iconElements}
      </ul>

      <ul id="link-menu" className="navbar-menu">
        <li id="navbar-home" className="navbar-element">
          <Link
            className="navbar-link"
            to="/"
            onClick={() => {
              stepContext.setCurrentStep(0);
            }}
          >
            ACCUEIL
          </Link>
        </li>

        {linkElements}
      </ul>
    </nav>
  );
};

export default Nav;
