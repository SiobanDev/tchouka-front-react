import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavStyle.scss";
import StepContext from "../context/StepContext";
import {updateNavIconStyle} from "./Nav.service";
import { handleClickToAnotherPage } from "../utils/utils";

const Nav = () => {
  const stepContext = useContext(StepContext);
  const LinkList = document.getElementsByClassName("navbar-link");
  const navIconsList = document.getElementsByClassName("menu-icon");

  useEffect(() => {
    updateNavIconStyle(LinkList, navIconsList)
  }, [LinkList, navIconsList]);

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
            onClick={()=>handleClickToAnotherPage(stepContext)}
          >
            ACCUEIL
          </Link>
        </li>

        <li id="navbar-step1" className="navbar-element">
          <Link
            className="navbar-link"
            to="/rythme"
            onClick={()=>handleClickToAnotherPage(stepContext)}
           
          >
            RYTHME
          </Link>
        </li>

        <li id="navbar-step2" className="navbar-element">
          <Link
            className="navbar-link"
            to="/percussions"
            onClick={()=>handleClickToAnotherPage(stepContext)}
            
          >
            PERCUSSIONS
          </Link>
        </li>
        <li id="navbar-step3" className="navbar-element">
          <Link
            className="navbar-link"
            to="/apprentissage"
            onClick={()=>handleClickToAnotherPage(stepContext)}
          >
            APPRENTISSAGE
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
