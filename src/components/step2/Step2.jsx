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
import {  percussionStep } from "../../config/mainConstants";
import { adaptComposition } from "./Step2.utils";

const Step2 = () => {
  const { partition } = useContext(PartitionContext);
  const { setCurrentStep } = useContext(StepContext);
  const { composition, setComposition, setIsLastItemRemoved } = useContext(
    CompositionContext
  );

  const handleBackspace = () => {
    if (composition.length > 0) {
      const compositionTmp = composition;
      compositionTmp.splice(composition.length - 1, 1);
      setComposition(compositionTmp);

      console.log(
        "composition dans Step2 after backspace " + JSON.stringify(composition, null, " ")
      );

      setIsLastItemRemoved(true);
    }
  };

  const handleReset = () => {
    setComposition([]);
    localStorage.removeItem("composition");
  };

  const goToPreviousStep = () => {
    localStorage.removeItem("composition");
    setComposition([]);
  };

  const goToNextStep = () => {
    adaptComposition(composition, setComposition);
    localStorage.setItem("composition", JSON.stringify(composition));
  };

  useEffect(() => {
    if (composition.length === 0 && localStorage.getItem("composition")) {
      setComposition(JSON.parse(localStorage.getItem("composition")));
    }
    setCurrentStep(percussionStep);
  }, [composition.length, setComposition, setCurrentStep]);

  console.log("partition in Step2 :" + JSON.stringify(partition));

  return (
    <section id="step2">
      <div className="column1">
        <ModelJP />
      </div>
      <div className="column2">
        <p className="instruction">
          <span className="round-icon">2</span>Je clique sur les parties du corps de Jean-Patricia pour les associer à mes notes.
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
