import React, { useContext, useEffect } from "react";
//styles
import "./Step3.style.scss";
//components
import StepContext from "../../context/StepContext";
import { step2Url } from "../../config/urlConstants";
import CompositionContext from "../../context/CompositionContext";
import JPAnimation from "./JPAnimation";
import AnimationContext from "../../context/AnimationContext";
//styles
import "../shared/StepButtons.style.scss";
import PreviousStepButton from "../shared/PreviousStepButton";
import { learningStep } from "../../config/mainConstants";
import { getAllImageDurationList, getAllImageDelayList } from "./Step3.utils";
import Controls from "./animationControls/Controls";
import InscriptionHook from "../shared/InscriptionHook";

const Step3 = () => {
  const { composition } = useContext(CompositionContext);
  const { setCurrentStep } = useContext(StepContext);
  const { playingAnimation } = useContext(AnimationContext);
  const allImageDurationList = getAllImageDurationList(composition);
  const allImageDelayList = getAllImageDelayList(allImageDurationList);

  useEffect(() => {
    setCurrentStep(learningStep);
  }, [setCurrentStep]);

  // console.log(
  //   "in step 3. repeat : " + repeat + " and playAnimation :" + playingAnimation
  // );

  return (
    <section id="step3" className="main-content">
      <div id="column1">
        <JPAnimation
          allImageDelayList={allImageDelayList}
          playingAnimation={playingAnimation}
        />
      </div>

      <div id="column2">
        <p className="instruction">
          <span className="round-icon">3</span>Je chante les mots associés à
          chaque partie du corps pour mieux mémoriser mon enchaînement Tchouka !
        </p>

        <Controls allImageDelayList={allImageDelayList} />
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
