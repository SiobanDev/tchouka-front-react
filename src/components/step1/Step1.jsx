import React, { useContext } from "react";
//styles
import "./Step1.style.scss";
//components
import AvailableNotesContainer from "./AvailableNotesContainer";
import StaveContainerStep1 from "./StaveContainerStep1";
import PartitionContext from "../../context/PartitionContext";
import StepContext from "../../context/StepContext";
import { step2Url, homeUrl } from "../../config/urlConstants";
import { handleClickToAnotherPage } from "../../utils/utils";
import StepButtons from "../main/StepButtons";
import { useEffect } from "react";

const Step1 = () => {
  const partitionContext = useContext(PartitionContext);
  const partition = partitionContext.partition;
  const stepContext = useContext(StepContext);

  useEffect(() => {
    if (localStorage.getItem("partition")) {
      partitionContext.setPartition(
        JSON.parse(localStorage.getItem("partition"))
      );
    }
  }, []);

  const handleBackspace = () => {
    console.log("partition before : " + partition);
    if (partition.length > 0) {
      partitionContext.setPartition(partition.pop());
      console.log("partition after: " + JSON.stringify(partition));
    }
  };

  const handleReset = () => {
    partitionContext.setPartition([]);
    localStorage.removeItem("partition");
  };

  const goToPreviousStep = () => {
    stepContext.setEndedStep(0);
    handleClickToAnotherPage(stepContext, 1);
    localStorage.removeItem("partition");
  };

  const goToNextStep = () => {
    stepContext.setEndedStep(1);
    handleClickToAnotherPage(stepContext, 2);
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
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
        previousStepUrl={homeUrl}
        nextStepUrl={step2Url}
      />
    </section>
  );
};

export default Step1;
