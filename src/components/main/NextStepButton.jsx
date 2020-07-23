import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
//styles
import "./StepButtons.style.scss";
import StepContext from "../../context/StepContext";

const NextStepButton = ({ handleClick, nextPageUrl, isHomeButton }) => {
  if (isHomeButton) {
    return (
      <div className="joint-step">
        <Link to={nextPageUrl} onClick={handleClick}>
          <i className="fas fa-arrow-circle-right round-icon"></i>
        </Link>
        <Link to={nextPageUrl} onClick={handleClick}>
          Je commence
        </Link>
      </div>
    );
  }
  return (
    <div id="next-step" className="joint-step">
      <Link to={nextPageUrl} onClick={handleClick}>
        <i className="fas fa-arrow-circle-right round-icon"></i>
      </Link>
      <Link to={nextPageUrl} onClick={handleClick}>
        Étape suivante
      </Link>
    </div>
  );
};

export default NextStepButton;
