import React, { useContext } from "react";
import { Link } from "react-router-dom";
//styles
import "./StepButtons.style.scss";
import ScoreContext from "../../context/ScoreContext";
import StepContext from "../../context/StepContext";
import CompositionContext from "../../context/CompositionContext";

//text, boolean,

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
          <i className="fas fa-arrow-circle-right round-icon"></i>
        </div>
        <div>{text}</div>
      </div>
    );
  }

  return (
    <div id="next-step" className="joint-step">
      <Link to={nextPageUrl} onClick={handleClick}>
        <i className="fas fa-arrow-circle-right round-icon"></i>
      </Link>
      <Link to={nextPageUrl} onClick={handleClick}>
        {text}
      </Link>
    </div>
  );
};

export default NextStepButton;
