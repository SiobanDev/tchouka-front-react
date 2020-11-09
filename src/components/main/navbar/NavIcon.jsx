import React from "react";
//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const NavIcon = ({ isAllowed, i, isActive }) => {
  const notAllowedClass = isAllowed ? "" : "nav-icon-not-allowed";
  const isActiveClass = isActive ? "active" : "";
  const componentClasses = `navbar-element ${notAllowedClass}`;

  if (i === 0) {
    return (
      <li id="navbar-element-0" className={componentClasses} key={i}>
        <span className={`round-icon menu-icon ${isActiveClass}`}>
          <FontAwesomeIcon icon={faHome} />
        </span>
      </li>
    );
  }

  return (
    <React.Fragment key={i}>
      <li className="line">
        <hr color="#2CA4A0" />
      </li>
      <li id={`navbar-element-${i}`} className={componentClasses}>
        <span className={`round-icon menu-icon ${isActiveClass}`}>{i}</span>
      </li>
    </React.Fragment>
  );
};

export default NavIcon;
