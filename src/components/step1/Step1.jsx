import React, { useContext } from "react";
//styles
import "./Step1.style.scss";
//components
import AvailableNotesContainer from "./AvailableNotesContainer";
import StaveContainerStep1 from "./StaveContainerStep1";
import PartitionContext from "../../context/PartitionContext";
import StepContext from "../../context/StepContext";
import { step2Url, homeUrl } from "../../config/urlConstants";
import StepButtons from "../main/StepButtons";
import { useEffect } from "react";
import { updateNavIconStyle } from "../main/Nav.service";

const Step1 = () => {
  const partitionContext = useContext(PartitionContext);
  const partition = partitionContext.partition;
  const { setCurrentStep } = useContext(StepContext);

  // console.log("endedStep in Step1: " + stepContext.endedStep);

  useEffect(() => {
    console.log("useEffect dans Step1");
    setCurrentStep(1);

    if (localStorage.getItem("partition")) {
      partitionContext.setPartition(
        JSON.parse(localStorage.getItem("partition"))
      );
    }
  }, [setCurrentStep, partitionContext]);

  const handleBackspace = () => {
    console.log("partition before : " + partition);
    if (partition.length > 0) {
      partitionContext.setPartition(partition.splice(0, partition.length - 1));
    }
  };

  const handleReset = () => {
    partitionContext.setPartition([]);
    localStorage.removeItem("partition");
  };

  const goToPreviousStep = () => {
    // updateNavIconStyle(0);
    // stepContext.setCurrentStep(0);
    localStorage.removeItem("partition");
  };

  const goToNextStep = () => {
    // updateNavIconStyle(2);
    // stepContext.setCurrentStep(1);
    localStorage.setItem("partition", JSON.stringify(partition));
  };

  return (
    <section id="step1">
      <p className="instruction">
        <span className="round-icon">1</span>J'écris ma partition rythmique en
        cliquant sur les notes.
      </p>

      <AvailableNotesContainer />
      <i
        className="fas fa-backspace instruction-button"
        onClick={handleBackspace}
      ></i>
      <i className="fas fa-trash instruction-button" onClick={handleReset}></i>
      <StaveContainerStep1 />

      <StepButtons
        IsNextButton={true}
        IsPreviousButton={true}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
        previousStepUrl={homeUrl}
        nextStepUrl={step2Url}
      />
    </section>
  );
};

export default Step1;
