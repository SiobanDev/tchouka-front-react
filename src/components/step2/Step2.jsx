import React, { useContext } from "react";
//styles
import "./Step2.style.scss";
//components
import Partition from "./Partition";
import ModelJP from "./ModelJP";
import StepContext from "../../context/StepContext";
import PartitionContext from "../../context/PartitionContext";
import { step3Url, step1Url } from "../../config/urlConstants";
import CompositionContext from "../../context/CompositionContext";
import StepButtons from "../main/StepButtons";
import { updateNavIconStyle } from "../main/Nav.service";
import { useEffect } from "react";
import { updateCurrentStepDependingOnUrl } from "../main/MainContent.service";

const Step2 = () => {
  const partitionContext = useContext(PartitionContext);
  const partition = partitionContext.partition;
  const { setCurrentStep } = useContext(StepContext);
  const compositionContext = useContext(CompositionContext);
  const composition = compositionContext.composition;

  useEffect(() => {
    console.log("useEffect dans Step2");
    setCurrentStep(2);
    console.log("composition dans Step2 : " + JSON.stringify(composition));

  }, [composition, setCurrentStep]);

  // console.log("endedStep in Step2: " + stepContext.endedStep);

  const handleBackspace = () => {
    // console.log("partition before : " + composition);
    if (composition.length > 0) {
      compositionContext.setComposition(
        composition.splice(0, composition.length - 1)
      );

      // composition.pop();
      // composition.setPartition(composition);
      // console.log("partition after: " + JSON.stringify(composition));
    }
  };

  const handleReset = () => {
    compositionContext.setComposition([]);
  };

  const goToPreviousStep = () => {
    // updateNavIconStyle(1);
    // stepContext.setCurrentStep(1);
  };

  const goToNextStep = () => {
    // updateNavIconStyle(2);
    // stepContext.setCurrentStep(3);
    if(partition.length !== composition.length){
      //TO DO : don't allow step3 if there isn't both joined singing word and sound for each note. 
    }
  };

  return (
    <section id="step2">
      <div className="column1">
        <ModelJP />
      </div>
      <div className="column2">
        <p className="instruction">
          <span className="round-icon">2</span>Je clique sur les parties du
          corps de Jean-Patricia pour les associer à mes notes.
        </p>
        <i
          className="fas fa-backspace instruction-button"
          onClick={handleBackspace}
        ></i>
        <i
          className="fas fa-trash instruction-button"
          onClick={handleReset}
        ></i>
        <div className="staves-container">
          <Partition />
        </div>
      </div>

      {/* TO DO :  send the compo to BDD*/}
      <StepButtons
        IsNextButton={true}
        IsPreviousButton={true}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
        previousStepUrl={step1Url}
        nextStepUrl={step3Url}
      />
    </section>
  );
};

export default Step2;
