import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavStyle.css";
import StepContext from "../context/StepContext";

const Nav = () => {
  const stepContext = useContext(StepContext);

  return (
      <nav role="navigation">
        <ul className="navbar-menu">
          <li id="navbar-home" className="navbar-element">
            <NavLink exact strict to="/" activeClassName="selected">
              Accueil
            </NavLink>
          </li>

          <li id="navbar-step1" className="navbar-element">
            <NavLink
              exact
              to="/rythme"
              activeClassName="selected"
              isActive={() => {
                [0, 1, 2, 3].includes(stepContext.endedStep);
              }}
            >
              Rythme
            </NavLink>
          </li>

          <li id="navbar-step2" className="navbar-element">
            <NavLink
              exact
              to="/percussions"
              activeClassName="selected"
              isActive={() => {
                [1, 2, 3].includes(stepContext.endedStep);
              }}
            >
              Percussions
            </NavLink>
          </li>

          <li id="navbar-step3" className="navbar-element">
            <NavLink
              exact
              to="/apprentissage"
              activeClassName="selected"
              isActive={() => {
                [2, 3].includes(stepContext.endedStep);
              }}
            >
              Apprentissage
            </NavLink>
          </li>
        </ul>
      </nav>
  );
};

export default Nav;
