import React, { useContext } from "react";
//Libraries
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
//Styles
import "./StepButtons.style.scss";
//Contexts
import ScoreContext from "../../context/ScoreContext";
import StepContext from "../../context/StepContext";
import CompositionContext from "../../context/CompositionContext";

const NextStepButton = ({ handleClick, nextPageUrl, text }) => {
  const { score } = useContext(ScoreContext);
  const { composition } = useContext(CompositionContext);
  const { currentStep } = useContext(StepContext);

  if (
    (score.length === 0 && currentStep === 1) ||
    (composition.length !== score.length && currentStep === 2)
  ) {
    return (
      <div id="next-step" className="not-allowed-joint-step">
        <div>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </div>
        <div>{text}</div>
      </div>
    );
  }

  return (
    <div id="next-step" className="joint-step">
      <Link to={nextPageUrl} onClick={handleClick}>
        <FontAwesomeIcon className="round-icon" icon={faArrowCircleRight} />
      </Link>
      <Link to={nextPageUrl} onClick={handleClick}>
        {text}
      </Link>
    </div>
  );
};

export default NextStepButton;
