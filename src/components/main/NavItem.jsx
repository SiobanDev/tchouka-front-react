import React from "react";
//components
import { Link } from "react-router-dom";

const NavItem = ({
  isAllowed,
  urlMenuList,
  itemNameMenuList,
  setCurrentStep,
  i,
}) => {

  if (!isAllowed) {
    return (
      <li
        id={`navbar-step${i}`}
        className="navbar-element"
        key={i}
      >
        <div className="navbar-link">{itemNameMenuList[i]}</div>
      </li>
    );
  }

  return (
    <li id={`navbar-step${i}`} className="navbar-element" key={i}>
      <Link
        className="navbar-link"
        to={urlMenuList[i]}
        onClick={() => {
          setCurrentStep(i);
        }}
      >
        {itemNameMenuList[i]}
      </Link>
    </li>
  );
};

export default NavItem;
