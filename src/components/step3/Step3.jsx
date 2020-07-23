import React, { useContext, useState, useEffect } from "react";
//styles
import "./Step3.style.scss";
//components
import StepContext from "../../context/StepContext";
import { step3Url, step1Url } from "../../config/urlConstants";
import CompositionContext from "../../context/CompositionContext";
import StepButtons from "../main/StepButtons";
import JPAnimation from "./JPAnimation";


const Step3 = () => {
  const { setCurrentStep } = useContext(StepContext);
  const compositionContext = useContext(CompositionContext);
  const composition = compositionContext.composition;
  const [playAnimation, setPlayAnimation] = useState(false);
  const [timeCode, setTimeCode] = useState(0);
  const interval = 2500;

  console.log("composition in step3 : " + JSON.stringify(composition));

  const getCompositionDuration = (notes) => {
    let durationList = [];
    for (let i = 0; i < notes.length; i++) {
      durationList.push(notes[i].duration);
    }
    const sumOfAllDurations = durationList.reduce(function (a, b) {
      return a + b;
    });

    const convertedDurationSum = sumOfAllDurations * 1000;
    console.log("convertedDurationSum" + convertedDurationSum);

    return convertedDurationSum;
  };

  console.log("timeCode : " + timeCode);

  useEffect(() => {
    console.log("useEffect dans Step3");
    setCurrentStep(3);
    if (timeCode < getCompositionDuration(composition) && playAnimation) {
      setTimeout(() => setTimeCode(timeCode + interval), interval);
    }
  }, [composition, setCurrentStep, timeCode, playAnimation]);

  console.log("playAnimation : " + playAnimation);

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
            notes={composition}
            timeCode={timeCode}
            startAnimation={playAnimation}
          />
        ) : (
          <img
            className="movement-image"
            src={composition[0].movement[0]}
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
};

export default Step3;
