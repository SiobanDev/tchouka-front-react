import React, { useContext } from "react";
//styles
import "./Step1.style.scss";
//components
import AvailableNotesContainer from "./AvailableNotesContainer";
import StaveContainerStep1 from "./StaveContainerStep1";
import ScoreContext from "../../context/ScoreContext";
import StepContext from "../../context/StepContext";
import { step2Url } from "../../config/urlConstants";
import { useEffect } from "react";
import NextStepButton from "../main/NextStepButton";
//styles
import "../main/StepButtons.style.scss";
import { rythmStep } from "../../config/mainConstants";

const Step1 = () => {
  const { score, setScore } = useContext(ScoreContext);
  const { setCurrentStep } = useContext(StepContext);

  useEffect(() => {
    if (score.length === 0 && localStorage.getItem("score")) {
      setScore(JSON.parse(localStorage.getItem("score")));
    }

    setCurrentStep(rythmStep);
  }, [score, setCurrentStep, setScore]);

  const handleBackspace = () => {
    //console.log("score before : " + score);

    if (score.length > 0) {
      const scoreTmp = [...score];
      scoreTmp.splice(score.length - 1, 1);
      setScore(scoreTmp);
    }
  };

  const handleReset = () => {
    setScore([]);
    localStorage.removeItem("score");
  };

  const goToNextStep = () => {
    console.log("score in Step1 :" + JSON.stringify(score));
    localStorage.setItem("score", JSON.stringify(score));
  };

  return (
    <section id="step1" className="main-content">
      <p className="instruction">
        <span className="round-icon">1</span>J'écris ma score rythmique en
        cliquant sur les notes ci-dessous.
      </p>

      <AvailableNotesContainer />
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
      <StaveContainerStep1 />

      <div id="step-buttons-container">
        <NextStepButton
          handleClick={goToNextStep}
          nextPageUrl={step2Url}
          text="Étape suivante"
        />
      </div>
    </section>
  );
};

export default Step1;
