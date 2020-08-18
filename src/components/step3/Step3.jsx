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

const Step3 = () => {
  const { setCurrentStep } = useContext(StepContext);
  const { composition, setComposition } = useContext(CompositionContext);
  // const composition = compositionContext.composition;

  const [playAnimation, setPlayAnimation] = useState(false);
  const [timeCode, setTimeCode] = useState(0);
  const interval = 2500;
  const getCompositionDuration = (notes) => {
    let durationList = [];

    if (notes.length > 0) {
      for (let i = 0; i < notes.length; i++) {
        durationList.push(notes[i].duration);
      }
      const sumOfAllDurations = durationList.reduce(function (a, b) {
        return a + b;
      });

    //   const convertedDurationSum = sumOfAllDurations
      console.log("sumOfAllDurations : " + sumOfAllDurations);

      return sumOfAllDurations;
    }
    return 0;
  };

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
