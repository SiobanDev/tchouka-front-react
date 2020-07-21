import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavStyle.scss";
import { updateNavIconStyle } from "./Nav.service";
import { handleClickToAnotherPage } from "../utils/utils";
import StepContext from "../context/StepContext";

const Nav = () => {
  const stepContext = useContext(StepContext);
  const LinkList = document.getElementsByClassName("navbar-link");
  const navIconsList = document.getElementsByClassName("menu-icon");

  useEffect(() => {
    updateNavIconStyle(LinkList, navIconsList);
  }, [LinkList, navIconsList, stepContext]);

  return (
    <nav role="navigation">
      <ul className="navbar-menu up-menu">
        <li id="navbar-element-0" className="navbar-element">
          <span className="fas fa-home round-icon menu-icon"></span>
        </li>
        <li className="line">
          <hr color="#2CA4A0" />
        </li>

        <li id="navbar-element-1" className="navbar-element">
          <span className="round-icon menu-icon">1</span>
        </li>
        <li className="line">
          <hr color="#2CA4A0" />
        </li>

        <li id="navbar-element-2" className="navbar-element">
          <span className="round-icon menu-icon">2</span>
        </li>
        <li className="line">
          <hr color="#2CA4A0" />
        </li>

        <li id="navbar-element-3" className="navbar-element">
          <span className="round-icon menu-icon">3</span>
        </li>
      </ul>

      <ul className="navbar-menu down-menu">
        <li id="navbar-home" className="navbar-element">
          <Link
            className="navbar-link"
            to="/"
            onClick={() => {
              handleClickToAnotherPage(stepContext, 0);
            }}
          >
            ACCUEIL
          </Link>
        </li>

        <li id="navbar-step1" className="navbar-element">
          <Link
            className="navbar-link"
            to="/rythme"
            onClick={() => {
              handleClickToAnotherPage(stepContext, 1);
            }}
          >
            RYTHME
          </Link>
        </li>

        <li id="navbar-step2" className="navbar-element">
          <Link
            className="navbar-link"
            to="/percussions"
            onClick={() => {
              handleClickToAnotherPage(stepContext, 2);
            }}
          >
            PERCUSSIONS
          </Link>
        </li>
        <li id="navbar-step3" className="navbar-element">
          <Link
            className="navbar-link"
            to="/apprentissage"
            onClick={() => {
              handleClickToAnotherPage(stepContext, 3);
            }}
          >
            APPRENTISSAGE
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
