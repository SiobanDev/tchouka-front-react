import React, { useContext } from "react";
//Styles
import "./Step3.style.scss";
import "../shared/StepButtons.style.scss";
//Components
import { step2Url } from "../../config/urlConstants";
import JPAnimation from "./JPAnimation";
import PreviousStepButton from "../shared/PreviousStepButton";
import Controls from "./animationControls/Controls";
//Contexts
import AnimationContext from "../../context/AnimationContext";
import CompositionContext from "../../context/CompositionContext";
//Utils
import { getAllImageDurationList, getAllImageDelayList } from "./Step3.utils";

const Step3 = () => {
  const { composition } = useContext(CompositionContext);
  const { playingAnimation } = useContext(AnimationContext);
  const allImageDurationList = getAllImageDurationList(composition);
  const allImageDelayList = getAllImageDelayList(allImageDurationList);

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
