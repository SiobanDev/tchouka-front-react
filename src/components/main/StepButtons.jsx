import React from "react";
import PreviousStepButton from "./PreviousStepButton";
import NextStepButton from "./NextStepButton";
//styles
import "./StepButtons.style.scss";

const StepButtons = ({
  goToPreviousStep,
  goToNextStep,
  previousStepUrl,
  nextStepUrl,
}) => {
  return (
    <div id="step-buttons-container">
      <PreviousStepButton
        handleClick={goToPreviousStep}
        previousPageUrl={previousStepUrl}
      />
      <NextStepButton handleClick={goToNextStep} nextPageUrl={nextStepUrl} />
    </div>
  );
};

export default StepButtons;
