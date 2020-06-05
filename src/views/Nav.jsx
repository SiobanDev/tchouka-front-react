import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavStyle.scss";
import StepContext from "../context/StepContext";
import {updateNavIconStyle} from "./Nav.service";

const Nav = () => {
  const stepContext = useContext(StepContext);
  const navLinkList = document.getElementsByClassName("navbar-link");
  const navIconsList = document.getElementsByClassName("round-icon");

  useEffect(() => {
    updateNavIconStyle(navLinkList, navIconsList)
  }, [navLinkList, navIconsList]);

  return (
    <nav role="navigation">
      <ul className="navbar-menu up-menu">
        <li id="navbar-element-0" className="navbar-element">
          <span className="fas fa-home round-icon"></span>
        </li>
        <li className="line">
          <hr color="#2CA4A0" />
        </li>

        <li id="navbar-element-1" className="navbar-element">
          <span className="round-icon">1</span>
        </li>
        <li className="line">
          <hr color="#2CA4A0" />
        </li>

        <li id="navbar-element-2" className="navbar-element">
          <span className="round-icon">2</span>
        </li>
        <li className="line">
          <hr color="#2CA4A0" />
        </li>

        <li id="navbar-element-3" className="navbar-element">
          <span className="round-icon">3</span>
        </li>
      </ul>

      <ul className="navbar-menu down-menu">
        <li id="navbar-home" className="navbar-element">
          <NavLink
            className="navbar-link"
            exact
            strict
            to="/"
            activeClassName="selected"
          >
            ACCUEIL
          </NavLink>
        </li>

        <li id="navbar-step1" className="navbar-element">
          <NavLink
            className="navbar-link"
            exact
            to="/rythme"
            activeClassName="selected"
            isActive={() => {
              [0, 1, 2, 3].includes(stepContext.endedStep);
            }}
          >
            RYTHME
          </NavLink>
        </li>

        <li id="navbar-step2" className="navbar-element">
          <NavLink
            className="navbar-link"
            exact
            to="/percussions"
            activeClassName="selected"
            isActive={() => {
              [1, 2, 3].includes(stepContext.endedStep);
            }}
          >
            PERCUSSIONS
          </NavLink>
        </li>
        <li id="navbar-step3" className="navbar-element">
          <NavLink
            className="navbar-link"
            exact
            to="/apprentissage"
            activeClassName="selected"
            isActive={() => {
              [2, 3].includes(stepContext.endedStep);
            }}
          >
            APPRENTISSAGE
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
