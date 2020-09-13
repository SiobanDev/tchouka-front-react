import React, { useContext } from "react";
//components
import { Link } from "react-router-dom";
import PartitionContext from "../../../context/PartitionContext";
import CompositionContext from "../../../context/CompositionContext";

const NavTextCopy = ({
  isAllowed,
  urlMenuList,
  itemNameMenuList,
  currentStep,
  setCurrentStep,
  i,
}) => {
  const { partition, setPartition } = useContext(PartitionContext);
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
              localStorage.setItem("partition", JSON.stringify(partition));
            } else if (currentStep === 2) {
              if (partition.length === composition.length) {
                localStorage.setItem(
                  "composition",
                  JSON.stringify(composition)
                );
              }
            }
          } else if (currentStep > i) {
            if (currentStep === 1) {
              setPartition([]);
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
