import React, { useContext } from "react";
//components
import AvailableNotesContainer from "./AvailableNotesContainer";
import StaveContainerStep1 from "./StaveContainerStep1";
import PartitionContext from "../../context/PartitionContext";
import StepContext from "../../context/StepContext";
import { step2Url } from "../../config/urlConstants";
import { useEffect } from "react";
import NextStepButton from "../main/NextStepButton";
//styles
import "../main/StepButtons.style.scss";

const Step1 = () => {
  const { partition, setPartition } = useContext(PartitionContext);
  const { setCurrentStep } = useContext(StepContext);
  setCurrentStep(1);

  useEffect(() => {
    console.log("partition dans Step1 : " + JSON.stringify(partition));
  }, [partition]);

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

  const goToNextStep = () => {
    localStorage.setItem("partition", JSON.stringify(partition));
  };

  return (
    <section id="step1">
      <p className="instruction">
        <span className="round-icon">1</span>J'écris ma partition rythmique en
        cliquant sur les notes ci-dessous.
      </p>

      <AvailableNotesContainer />
      <i
        className="fas fa-backspace instruction-button"
        onClick={handleBackspace}
      ></i>
      <i className="fas fa-trash instruction-button" onClick={handleReset}></i>
      <StaveContainerStep1 />

      <div id="step-buttons-container">
        <NextStepButton
          handleClick={goToNextStep}
          nextPageUrl={step2Url}
          text="Étape suivante"
        />
      </div>
    </section>
  );
};

export default Step1;
