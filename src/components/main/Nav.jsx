import React, { useContext, useEffect } from "react";
import "./NavStyle.scss";
import StepContext from "../../context/StepContext";
import PartitionContext from "../../context/PartitionContext";
import CompositionContext from "../../context/CompositionContext";
import NavIcon from "./NavIcon";
import NavItem from "./NavItem";
import { percussionStep } from "../../config/mainConstants";

const Nav = () => {
  const { currentStep, setCurrentStep } = useContext(StepContext);
  const { partition } = useContext(PartitionContext);
  const { composition } = useContext(CompositionContext);
  const iconElements = [];
  const linkElements = [];

  const itemNameMenuList = [
    "ACCUEIL",
    "RYTHME",
    "PERCUSSIONS",
    "APPRENTISSAGE",
  ];

  const urlMenuList = ["/", "/rythme", "/percussions", "/apprentissage"];

  const lastAllowedStep =
    partition.length === 0 || (composition.length !== partition.length && currentStep === percussionStep)
      ? currentStep
      : currentStep + 1;

      console.log("current step in Nav : " + currentStep)

  for (let i = 0; i < itemNameMenuList.length; i++) {
    const isActive = i === currentStep;

    if (i <= lastAllowedStep) {
      iconElements.push(<NavIcon isAllowed={true} i={i} key={i} isActive={isActive}/>);
      linkElements.push(
        <NavItem
          isAllowed={true}
          urlMenuList={urlMenuList}
          itemNameMenuList={itemNameMenuList}
          setCurrentStep={setCurrentStep}
          i={i}
          key={i}
        />
      );
    } else {
      iconElements.push(<NavIcon isAllowed={false} i={i} key={i} isActive={isActive}/>);
      linkElements.push(
        <NavItem
          isAllowed={false}
          urlMenuList={urlMenuList}
          itemNameMenuList={itemNameMenuList}
          setCurrentStep={setCurrentStep}
          i={i}
          key={i}
        />
      );
    }
  }

  return (
    <nav role="navigation">
      <ul id="icon-menu" className="navbar-menu">
        {iconElements}
      </ul>

      <ul id="link-menu" className="navbar-menu">
        {linkElements}
      </ul>
    </nav>
  );
};

export default Nav;
