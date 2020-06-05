import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavStyle.scss";
import StepContext from "../context/StepContext";
import {updateNavIconStyle} from "./Nav.service";

const Nav = () => {
  const stepContext = useContext(StepContext);
  const LinkList = document.getElementsByClassName("navbar-link");
  const navIconsList = document.getElementsByClassName("menu-icon");

  useEffect(() => {
    updateNavIconStyle(LinkList, navIconsList)
  }, [LinkList, navIconsList]);

  const handleClick = (event, nextStepsList) =>{
    if(LinkList){
      console.log("Linklist: " + LinkList);

      Array.from(LinkList).map(link => link.classList.remove("active"));
    }
    if(event){
      event.target.classList.add("active");
    }
    if(nextStepsList){
      nextStepsList.includes(stepContext.endedStep)
    }
  }

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
            onClick={(event)=>handleClick(event)}
          >
            ACCUEIL
          </Link>
        </li>

        <li id="navbar-step1" className="navbar-element">
          <Link
            className="navbar-link"
            to="/rythme"
            onClick={(event)=>handleClick(event, [0, 1, 2, 3])}
           
          >
            RYTHME
          </Link>
        </li>

        <li id="navbar-step2" className="navbar-element">
          <Link
            className="navbar-link"
            to="/percussions"
            onClick={(event)=>handleClick(event, [1, 2, 3])}
            
          >
            PERCUSSIONS
          </Link>
        </li>
        <li id="navbar-step3" className="navbar-element">
          <Link
            className="navbar-link"
            to="/apprentissage"
            onClick={(event)=>handleClick(event, [1, 2, 3])}
          >
            APPRENTISSAGE
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
