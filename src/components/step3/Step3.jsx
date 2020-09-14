import React, { useContext, useState, useEffect } from "react";
//styles
import "./Step3.style.scss";
//components
import StepContext from "../../context/StepContext";
import { step2Url } from "../../config/urlConstants";
import CompositionContext from "../../context/CompositionContext";
import JPAnimation from "./JPAnimation";
import AnimationContext from "../../context/AnimationContext";
//styles
import "../main/StepButtons.style.scss";
import PreviousStepButton from "../main/PreviousStepButton";
import { learningStep } from "../../config/mainConstants";

const Step3 = () => {
  const { setCurrentStep } = useContext(StepContext);
  const { setPlayingAnimation } = useContext(
    AnimationContext
  );
  const [repeat, setRepeat] = useState(false);

  const handleCheckboxChange = () => {
    repeat ? setRepeat(false) : setRepeat(true);
  };

  useEffect(() => {
    setCurrentStep(learningStep);
  }, [setCurrentStep]);

  // console.log(
  //   "in step 3. repeat : " + repeat + " and playAnimation :" + playingAnimation
  // );

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
          <p>Mettre en pause l'animation</p>
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
};

export default Step3;
