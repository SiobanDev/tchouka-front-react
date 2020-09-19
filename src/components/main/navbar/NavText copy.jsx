import React, { useContext } from "react";
//components
import { Link } from "react-router-dom";
import ScoreContext from "../../../context/ScoreContext";
import CompositionContext from "../../../context/CompositionContext";

const NavTextCopy = ({
  isAllowed,
  urlMenuList,
  itemNameMenuList,
  currentStep,
  setCurrentStep,
  i,
}) => {
  const { score, setScore } = useContext(ScoreContext);
  const { composition, setComposition } = useContext(CompositionContext);

  if (!isAllowed) {
    return (
      <li id={`navbar-step${i}`} className="navbar-element" key={i}>
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
          if (currentStep < i) {
            if (currentStep === 1) {
              localStorage.setItem("score", JSON.stringify(score));
            } else if (currentStep === 2) {
              if (score.length === composition.length) {
                localStorage.setItem(
                  "composition",
                  JSON.stringify(composition)
                );
              }
            }
          } else if (currentStep > i) {
            if (currentStep === 1) {
              setScore([]);
              setComposition([]);
            } else if (currentStep === 2) {
              setComposition([]);
              localStorage.removeItem("composition");
            }
          }
          setCurrentStep(i);
        }}
      >
        {itemNameMenuList[i]}
      </Link>
    </li>
  );
};

export default NavTextCopy;
