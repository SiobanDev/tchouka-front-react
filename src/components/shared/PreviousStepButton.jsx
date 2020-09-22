import React from "react";
import { Link } from "react-router-dom";
//styles
import "./StepButtons.style.scss";

const PreviousStepButton = ({ handleClick, previousPageUrl }) => {
  return (
    <div id="previous-step" className="joint-step">
      <Link to={previousPageUrl} onClick={handleClick}>
        <i className="fas fa-arrow-circle-left round-icon"></i>
      </Link>
      <Link to={previousPageUrl} onClick={handleClick}>
        Étape précédente
      </Link>
    </div>
  );
};

export default PreviousStepButton;
