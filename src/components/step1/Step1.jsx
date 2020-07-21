import React, { useContext, useEffect } from "react";
//styles
import "./Step1.style.scss";
//components
import AvailableNotesContainer from "./AvailableNotesContainer";
import StaveContainerStep1 from "./StaveContainerStep1";
import PartitionContext from "../../context/PartitionContext";
import NextStep from "../main/NextStep";
import StepContext from "../../context/StepContext";
import { step2Url } from "../../config/urlConstants";
import { handleClickToAnotherPage } from "../../utils/utils";

const Step1 = () => {
  const partitionContext = useContext(PartitionContext);
  const partition = partitionContext.partition;
  const stepContext = useContext(StepContext);

  const handleBackspace = () => {
    console.log("partition before : " + partition);
    if (partition.length > 0) {
      partition.pop();
      partitionContext.setPartition(partition);
      console.log("partition after: " +JSON.stringify(partition));
    }
  };

  const handleReset = () => {
    partitionContext.setPartition([]);
  };

  const handleClick = () => {
      stepContext.setEndedStep(1);
      handleClickToAnotherPage(stepContext, 2);
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

      <NextStep handleClick={handleClick} nextPageUrl={step2Url} />
    </section>
  );
};

export default Step1;
