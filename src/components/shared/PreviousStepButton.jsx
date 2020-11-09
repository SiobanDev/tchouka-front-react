import React from "react";
//Libraries
import { Link } from "react-router-dom";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Styles
import "./StepButtons.style.scss";

const PreviousStepButton = ({ handleClick, previousPageUrl }) => {
  return (
    <div id="previous-step" className="joint-step">
      <Link to={previousPageUrl} onClick={handleClick}>
        <FontAwesomeIcon className="round-icon" icon={faArrowCircleLeft} />
      </Link>
      <Link to={previousPageUrl} onClick={handleClick}>
        Étape précédente
      </Link>
    </div>
  );
};

export default PreviousStepButton;
