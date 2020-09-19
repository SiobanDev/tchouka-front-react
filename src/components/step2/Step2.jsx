import React, { useContext } from "react";
//styles
import "./Step2.style.scss";
//components
import Score from "./Score";
import ModelJP from "./ModelJP";
import StepContext from "../../context/StepContext";
import { step3Url, step1Url } from "../../config/urlConstants";
import CompositionContext from "../../context/CompositionContext";
import { useEffect } from "react";
import PreviousStepButton from "../main/PreviousStepButton";
import NextStepButton from "../main/NextStepButton";
//styles
import "../main/StepButtons.style.scss";
import { percussionStep } from "../../config/mainConstants";
import { adaptComposition } from "./Step2.utils";

const Step2 = () => {
  const { setCurrentStep } = useContext(StepContext);
  const { composition, setComposition, setIsLastItemRemoved } = useContext(
    CompositionContext
  );

  const handleBackspace = () => {
    if (composition.length > 0) {
      const compositionTmp = [...composition];
      compositionTmp.splice(composition.length - 1, 1);
      setComposition(compositionTmp);

      console.log(
        "composition dans Step2 after backspace " +
          JSON.stringify(composition, null, " ")
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
  }, [composition, setComposition, setCurrentStep]);

  console.log("composition in Step2 :" + JSON.stringify(composition));

  return (
    <section id="step2" className="main-content">
      <div id="column1">
        <ModelJP />
      </div>
      <div id="column2">
        <p className="instruction">
          <span className="round-icon">2</span>Je clique sur les parties du
          corps de Jean-Patricia pour les associer à mes notes.
        </p>
        <i
          id="backspace-button"
          className="fas fa-backspace modification-button"
          onClick={handleBackspace}
        ></i>
        <i
          id="reset-button"
          className="fas fa-trash modification-button"
          onClick={handleReset}
        ></i>
        <div className="staves-container">
          <Score />
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
