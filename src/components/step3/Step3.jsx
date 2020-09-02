import React, { useContext, useState, useEffect } from "react";
//styles
import "./Step3.style.scss";
//components
import StepContext from "../../context/StepContext";
import { step2Url } from "../../config/urlConstants";
import CompositionContext from "../../context/CompositionContext";
import JPAnimation from "./JPAnimation";
import AnimationContext from "../../context/AnimationContext";

import { compositionData } from "../../mocks/compositionData";
//styles
import "../main/StepButtons.style.scss";
import PreviousStepButton from "../main/PreviousStepButton";
import { learningStep } from "../../config/mainConstants";

const Step3 = () => {
  const { setCurrentStep } = useContext(StepContext);
  // const { composition, setComposition } = useContext(CompositionContext);
  const { playingAnimation, setPlayingAnimation } = useContext(
    AnimationContext
  );
  const [repeat, setRepeat] = useState(false);

  const handleCheckboxChange = () => {
    repeat ? setRepeat(false) : setRepeat(true);
  };

  useEffect(() => {
    setCurrentStep(learningStep);

    // setComposition(compositionData);
  }, [repeat, setCurrentStep, setPlayingAnimation]);

  console.log(
    "in step 3. repeat : " + repeat + " and playAnimation :" + playingAnimation
  );

  if (compositionData && compositionData.length > 0) {
    return (
      <section id="step3">
        <div id="JP-container">
          <JPAnimation repeat={repeat} />
        </div>
        <div className="step3-command-container">
          <form className="repeat-item">
            <input
              type="checkbox"
              id="repeat-option"
              name="repeat-option"
              checked={repeat}
              onChange={handleCheckboxChange}
            />
            <p>Répéter</p>
          </form>
          <div className="play-item">
            <i
              className="far fa-play-circle round-icon"
              onClick={() => {
                setPlayingAnimation(true);
              }}
            ></i>
            <p>Lancer l'animation</p>
          </div>
          <div className="play-item">
            <i
              className="fas fa-stop-circle round-icon"
              onClick={() => {
                setPlayingAnimation(false);
              }}
            ></i>
            <p>Arrêter l'animation</p>
          </div>
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
