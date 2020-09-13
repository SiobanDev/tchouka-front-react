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
import { useEffect } from "react";
import PreviousStepButton from "../main/PreviousStepButton";
import NextStepButton from "../main/NextStepButton";
//styles
import "../main/StepButtons.style.scss";
import { rythmStep, percussionStep } from "../../config/mainConstants";
import { adaptComposition } from "../step3/Step3.utils";

const Step2 = () => {
  const { partition, setPartition } = useContext(PartitionContext);
  const { setCurrentStep } = useContext(StepContext);
  const { composition, setComposition, setIsLastItemRemoved } = useContext(
    CompositionContext
  );
  const handleBackspace = () => {
    if (composition.length > 0) {
      setComposition(composition.splice(0, composition.length - 1));
      console.log("composition dans Step2 " + JSON.stringify(composition));
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
    adaptComposition(composition, setComposition);

    if (partition.length === composition.length) {
      localStorage.setItem("composition", JSON.stringify(composition));
    }
  };

  useEffect(() => {
    setCurrentStep(percussionStep);

    if (
      localStorage.getItem("partition") &&
      JSON.stringify(partition).length !==
        localStorage.getItem("partition").length
    ) {
      setPartition(JSON.parse(localStorage.getItem("partition")));
    }
  }, [setPartition, partition, setCurrentStep]);

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

      <div id="step-buttons-container">
        <PreviousStepButton
          handleClick={goToPreviousStep}
          previousPageUrl={step1Url}
          text="Étape précédente"
        />
        <NextStepButton
          handleClick={goToNextStep}
          nextPageUrl={step3Url}
          text="Étape suivante"
        />
      </div>
    </section>
  );
};

export default Step2;
