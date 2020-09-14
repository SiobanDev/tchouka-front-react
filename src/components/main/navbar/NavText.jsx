import React, { useContext } from "react";
//components
import { Link } from "react-router-dom";
import PartitionContext from "../../../context/PartitionContext";
import CompositionContext from "../../../context/CompositionContext";
import { adaptCompoIfTwoConsecutiveMovements } from "../../step2/Step2.utils";

const NavText = ({
  isAllowed,
  urlMenuList,
  itemNameMenuList,
  currentStep,
  setCurrentStep,
  i,
}) => {
  const { partition } = useContext(PartitionContext);
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

          if (currentStep === 1 && i === 2) {
            localStorage.setItem("partition", JSON.stringify(partition));
          } else if ((currentStep === 2 || currentStep === 3) && i === 1) {
            localStorage.removeItem("composition");
            setComposition([]);
          } else if (currentStep === 2 && i === 3) {
            adaptCompoIfTwoConsecutiveMovements(composition, setComposition);
            localStorage.setItem("composition", JSON.stringify(composition));
          }

          setCurrentStep(i);
        }}
      >
        {itemNameMenuList[i]}
      </Link>
    </li>
  );
};

export default NavText;
