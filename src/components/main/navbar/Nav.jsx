import React, { useContext, useEffect } from "react";
import "./NavStyle.scss";
import StepContext from "../../../context/StepContext";
import ScoreContext from "../../../context/ScoreContext";
import CompositionContext from "../../../context/CompositionContext";
import NavIcon from "./NavIcon";
import NavText from "./NavText";
import { percussionStep } from "../../../config/mainConstants";

const Nav = () => {
  const { currentStep, setCurrentStep } = useContext(StepContext);
  const { score, setScore } = useContext(ScoreContext);
  const { composition, setComposition } = useContext(CompositionContext);
  const iconElements = [];
  const linkElements = [];

  const itemNameMenuList = [
    "ACCUEIL",
    "RYTHME",
    "PERCUSSIONS",
    "APPRENTISSAGE",
  ];

  const urlMenuList = ["/", "/rythme", "/percussions", "/apprentissage"];

  useEffect(() => {
    if (localStorage.getItem("score")) {
      setScore(JSON.parse(localStorage.getItem("score")));
    }

    if (localStorage.getItem("composition")) {
      setComposition(JSON.parse(localStorage.getItem("composition")));
    }
  }, [composition.length, score.length, setComposition, setScore]);

  const lastAllowedStep =
    score.length === 0 ||
    (composition.length !== score.length && currentStep === percussionStep)
      ? currentStep
      : currentStep + 1;

  //console.log("current step in Nav : " + currentStep);

  for (let i = 0; i < itemNameMenuList.length; i++) {
    const isActive = i === currentStep;

    if (i <= lastAllowedStep) {
      iconElements.push(
        <NavIcon isAllowed={true} i={i} key={i} isActive={isActive} />
      );
      linkElements.push(
        <NavText
          isAllowed={true}
          urlMenuList={urlMenuList}
          itemNameMenuList={itemNameMenuList}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          i={i}
          key={i}
        />
      );
    } else {
      iconElements.push(
        <NavIcon isAllowed={false} i={i} key={i} isActive={isActive} />
      );
      linkElements.push(
        <NavText
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
