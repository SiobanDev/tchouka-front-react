import React, { useContext, useState } from "react";
//styles
import "./Step1.style.scss";
//components
import AvailableNotesContainer from "./AvailableNotesContainer";
import StaveContainerStep1 from "./StaveContainerStep1";
import ScoreContext from "../../context/ScoreContext";
import StepContext from "../../context/StepContext";
import { step2Url } from "../../config/urlConstants";
import { useEffect } from "react";
import NextStepButton from "../shared/NextStepButton";
//styles
import "../shared/StepButtons.style.scss";
import { rythmStep } from "../../config/mainConstants";
import LoginContext from "../../context/LoginContext";
import NotificationContext from "../../context/NotificationContext";
import { saveNewScore } from "../../services/apiServices";
//libraries
import Loader from "react-loader-spinner";
import InscriptionHook from "../shared/InscriptionHook";

const Step1 = () => {
  const { score, setScore } = useContext(ScoreContext);
  const { setCurrentStep } = useContext(StepContext);
  const { loggedIn } = useContext(LoginContext);
  const [waitingForApiResponse, setWaitingForApiResponse] = useState(false);
  const { setOpen, setSeverityKind, setNotificationMessage } = useContext(
    NotificationContext
  );
  useEffect(() => {
    if (score.length === 0 && localStorage.getItem("score")) {
      setScore(JSON.parse(localStorage.getItem("score")));
    }

    setCurrentStep(rythmStep);
  }, [score, setCurrentStep, setScore]);

  const handleBackUp = async () => {
    const userId = localStorage.getItem("userId");

    const apiScore = {
      user: userId,
      title: `Ma super partition n°${Math.trunc(Math.random() * 10)}`,
      noteList: JSON.stringify(score),
    };

    try {
      setWaitingForApiResponse(true);
      const apiResponse = await saveNewScore(apiScore);

      if (apiResponse.success) {
        setWaitingForApiResponse(false);
        setSeverityKind("success");
        setNotificationMessage(apiResponse.message);
        setOpen(true);
      } else if (!apiResponse.success) {
        setWaitingForApiResponse(false);
        setNotificationMessage(apiResponse.message);
        setOpen(true);
      }
    } catch (e) {
      setWaitingForApiResponse(false);
      console.log("Error saving the new score : " + e);
    }
  };

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

  console.log(`logged : ${loggedIn}`);

  return (
    <section id="step1" className="main-content">
      <p className="instruction">
        <span className="round-icon">1</span>J'écris ma partition rythmique en
        cliquant sur les notes ci-dessous.
      </p>
      <InscriptionHook step={1} />
      <AvailableNotesContainer />
      {loggedIn && waitingForApiResponse && (
        <Loader type="TailSpin" color="#2ca4a0ff" height={30} width={30} />
      )}
      <i
        id="save-button"
        className={`fas fa-save edition-button hidden ${
          loggedIn && !waitingForApiResponse ? "visible" : ""
        }`}
        onClick={handleBackUp}
      ></i>
      <i
        id="backspace-button"
        className="fas fa-backspace edition-button"
        onClick={handleBackspace}
      ></i>{" "}
      <i
        id="reset-button"
        className="fas fa-trash edition-button"
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
