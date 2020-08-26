import React, { useContext, useState, useEffect } from "react";
//styles
import "./Step3.style.scss";
//components
import StepContext from "../../context/StepContext";
import { step2Url } from "../../config/urlConstants";
import CompositionContext from "../../context/CompositionContext";
import JPAnimation from "./JPAnimation";
import { compositionData } from "../../mocks/compositionData";
//styles
import "../main/StepButtons.style.scss";
import PreviousStepButton from "../main/PreviousStepButton";
import { learningStep } from "../../config/mainConstants";

const Step3 = () => {
  const { setCurrentStep } = useContext(StepContext);
  // const { composition, setComposition } = useContext(CompositionContext);
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    setCurrentStep(learningStep);
    // setComposition(compositionData);
  }, [setCurrentStep]);

  //   console.log("playAnimation : " + playAnimation);
  if (compositionData && compositionData.length > 0) {
    return (
      <section id="step3">
          <div className="play-button-container">
          <i
            className="far fa-play-circle round-icon"
            onClick={() => {
              setPlayAnimation(true);
            }}
          ></i>
          <p
            onClick={() => {
              setPlayAnimation(true);
            }}
          >
            Lancer l'animation
          </p>
        </div>
        <div id="JP-container">
          <JPAnimation startAnimation={playAnimation}/>
        </div>

        <div id="step-buttons-container">
          <PreviousStepButton
            handleClick={() => {}}
            previousPageUrl={step2Url}
            text="Étape précédente"
          />
        </div>
      </section>
    );
  }
  return null;
};

export default Step3;
