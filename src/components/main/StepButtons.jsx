import React from "react";
import PreviousStepButton from "./PreviousStepButton";
import NextStepButton from "./NextStepButton";
//styles
import "./StepButtons.style.scss";

const StepButtons = ({
  IsNextButton,
  IsPreviousButton,
  isHomeButton,
  goToPreviousStep,
  goToNextStep,
  previousStepUrl,
  nextStepUrl,
}) => {
  if (isHomeButton) {
    return (
      <div id="step-buttons-container">
        <NextStepButton
          handleClick={goToNextStep}
          nextPageUrl={nextStepUrl}
          isHomeButton={isHomeButton}
        />
      </div>
    );
  }
  if (IsNextButton && IsPreviousButton) {
    return (
      <div id="step-buttons-container">
        <PreviousStepButton
          handleClick={goToPreviousStep}
          previousPageUrl={previousStepUrl}
        />
        <NextStepButton handleClick={goToNextStep} nextPageUrl={nextStepUrl} />
      </div>
    );
  }
  else if (IsPreviousButton) {
    return (
      <div id="step-buttons-container">
        <PreviousStepButton
          handleClick={goToPreviousStep}
          previousPageUrl={previousStepUrl}
        />
      </div>
    );
  } else if (IsNextButton) {
    return (
      <div id="step-buttons-container">
        <NextStepButton handleClick={goToNextStep} nextPageUrl={nextStepUrl} />
      </div>
    );
  }
};

export default StepButtons;
