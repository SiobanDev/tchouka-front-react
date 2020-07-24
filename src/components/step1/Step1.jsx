import React, { useContext } from "react";
//styles
import "./Step1.style.scss";
//components
import AvailableNotesContainer from "./AvailableNotesContainer";
import StaveContainerStep1 from "./StaveContainerStep1";
import PartitionContext from "../../context/PartitionContext";
import StepContext from "../../context/StepContext";
import { step2Url } from "../../config/urlConstants";
import StepButtons from "../main/StepButtons";
import { useEffect } from "react";

const Step1 = () => {
  const { partition, setPartition } = useContext(PartitionContext);
  const { setCurrentStep } = useContext(StepContext);

  useEffect(() => {
    setCurrentStep(1);
    console.log("partition dans Step1 : " + JSON.stringify(partition));

  }, [setCurrentStep, partition]);

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
        IsPreviousButton={false}
        goToPreviousStep={()=>{}}
        goToNextStep={goToNextStep}
        previousStepUrl={""}
        nextStepUrl={step2Url}
      />
    </section>
  );
};

export default Step1;
