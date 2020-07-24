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
  const { partition, setPartition } = useContext(PartitionContext);
  const { setCurrentStep } = useContext(StepContext);
  const localStgPartitionToObjt = JSON.parse(localStorage.getItem("partition"));

  // console.log("endedStep in Step1: " + stepContext.endedStep);

  useEffect(() => {
    setCurrentStep(1);

    if (
      localStorage.getItem("partition") &&
      partition.length !== localStgPartitionToObjt.length
    ) {
      setPartition(JSON.parse(localStorage.getItem("partition")));
    }
  }, [setCurrentStep, setPartition, partition, localStgPartitionToObjt]);

  const handleBackspace = () => {
    console.log("partition before : " + partition);
    if (partition.length > 0) {
      setPartition(partition.splice(0, partition.length - 1));
    }
  };

  const handleReset = () => {
    setPartition([]);
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
