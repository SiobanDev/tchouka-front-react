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
import { useEffect } from "react";

const Step2 = () => {
  const { partition, setPartition } = useContext(PartitionContext);
  const { setCurrentStep } = useContext(StepContext);
  const { composition, setComposition, setIsLastItemRemoved } = useContext(
    CompositionContext
  );

  // console.log("composition dans Step2 : " + JSON.stringify(composition));

  useEffect(() => {
    setCurrentStep(2);

    // console.log("partition dans Step2 : " + JSON.stringify(partition));

    if (
      localStorage.getItem("partition") &&
      JSON.stringify(partition).length !==
        localStorage.getItem("partition").length
    ) {
      setPartition(JSON.parse(localStorage.getItem("partition")));
    }

  }, [setCurrentStep, setPartition, partition]);

  // console.log("endedStep in Step2: " + endedStep);

  const handleBackspace = () => {
    if (composition.length > 0) {
      setComposition(composition.splice(0, composition.length - 1));
      setIsLastItemRemoved(true);
    }
  };

  const handleReset = () => {
    setComposition([]);
    localStorage.removeItem("composition");
  };

  const goToPreviousStep = () => {
    setComposition([]);
    localStorage.removeItem("composition");
  };

  const goToNextStep = () => {
    if (partition.length === composition.length) {
      localStorage.setItem("composition", JSON.stringify(composition));

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
