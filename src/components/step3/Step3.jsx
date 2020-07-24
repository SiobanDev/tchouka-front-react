import React, { useContext, useState, useEffect } from "react";
//styles
import "./Step3.style.scss";
//components
import StepContext from "../../context/StepContext";
import { step2Url } from "../../config/urlConstants";
import CompositionContext from "../../context/CompositionContext";
import StepButtons from "../main/StepButtons";
import JPAnimation from "./JPAnimation";
import { getCompositionDuration } from "./Step3.service";
import { compositionData } from "../../mocks/compositionData";

const Step3 = () => {
  const { setCurrentStep } = useContext(StepContext);
  const { composition, setComposition } = useContext(CompositionContext);
  // const composition = compositionContext.composition;

  const [playAnimation, setPlayAnimation] = useState(false);
  const [timeCode, setTimeCode] = useState(0);
  const interval = 2500;

  console.log("composition in step3 : " + JSON.stringify(composition));

  //   console.log("timeCode : " + timeCode);
  //

  useEffect(() => {
    setCurrentStep(3);
    setComposition(compositionData);

    // if (localStorage.getItem("composition")) {
    //   setComposition(JSON.parse(localStorage.getItem("composition")));
    //   //   console.log(
    //   //     "composition localStorage in step3 : " + JSON.stringify(composition)
    //   //   );
    // } else {
    //   localStorage.setItem("composition", JSON.stringify(composition));
    // }

    if (playAnimation) {
      while (timeCode < getCompositionDuration(composition)) {
        setTimeout(() => setTimeCode(timeCode + interval), interval);
      }
    }
  }, [playAnimation, composition, timeCode, setComposition, setCurrentStep]);

  //   console.log("playAnimation : " + playAnimation);
  if (composition && composition.length > 0) {
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
          {playAnimation ? (
            <JPAnimation timeCode={timeCode} startAnimation={playAnimation} />
          ) : (
            <img
              className="movement-image"
              src={composition[0].movementList[0]}
              alt="first-movement-of-jp"
            />
          )}
        </div>

        <StepButtons
          IsNextButton={false}
          IsPreviousButton={true}
          isHomeButton={false}
          goToPreviousStep={() => {}}
          goToNextStep={() => {}}
          previousStepUrl={step2Url}
          nextStepUrl={""}
        />
      </section>
    );
  }
  return null;
};

export default Step3;
