import React, { useContext, useState, useEffect } from "react";
//styles
import "./Step3.style.scss";
//components
import StepContext from "../../context/StepContext";
import { step3Url, step1Url } from "../../config/urlConstants";
import CompositionContext from "../../context/CompositionContext";
import StepButtons from "../main/StepButtons";
import JPAnimation from "./JPAnimation";
import { getCompositionDuration } from "./Step3.service";

const Step3 = () => {
  const { setCurrentStep } = useContext(StepContext);
  const compositionContext = useContext(CompositionContext);
  const composition = compositionContext.composition;
  const [playAnimation, setPlayAnimation] = useState(false);
  const [timeCode, setTimeCode] = useState(0);
  const interval = 2500;

  console.log("composition in step3 : " + JSON.stringify(composition));

  //   console.log("timeCode : " + timeCode);

//   if (localStorage.getItem("composition")) {
//     compositionContext.setComposition(
//       JSON.parse(localStorage.getItem("composition"))
//     );
//     //   console.log(
//     //     "composition localStorage in step3 : " + JSON.stringify(composition)
//     //   );
//   } else {
//     localStorage.setItem("composition", JSON.stringify(composition));
//   }

  useEffect(() => {
    if (playAnimation) {
      while (timeCode < getCompositionDuration(composition)) {
        setTimeout(() => setTimeCode(timeCode + interval), interval);
      }
    }
  }, [playAnimation, composition, timeCode]);

  //   console.log("playAnimation : " + playAnimation);
  if (composition && composition.length > 0) {
    return (
      <section id="step3">
        <button
          className="btn"
          onClick={() => {
            setPlayAnimation(true);
          }}
        >
          Jouer
        </button>
        <div id="JP-container">
          {playAnimation ? (
            <JPAnimation
              timeCode={timeCode}
              startAnimation={playAnimation}
            />
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
          previousStepUrl={""}
          nextStepUrl={step1Url}
        />
      </section>
    );
  }
  return null;
};

export default Step3;
