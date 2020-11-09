import React, { useContext, useState, useEffect } from "react";
//Styles
import "./Step1.style.scss";
import "../shared/StepButtons.style.scss";
//Components
import AvailableNotesContainer from "./AvailableNotesContainer";
import StaveContainerStep1 from "./StaveContainerStep1";
import NextStepButton from "../shared/NextStepButton";
import InscriptionHook from "../shared/InscriptionHook";
import AlertModal from "../shared/AlertModal";
import ResponseIcon from "../shared/ResponseIcon";
//Contexts
import ScoreContext from "../../context/ScoreContext";
import LoginContext from "../../context/LoginContext";
import NotificationContext from "../../context/NotificationContext"; //Constants
import { step2Url } from "../../config/urlConstants";
//Utils
import { saveNewUserData } from "../../services/apiServices";
//Libraries
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBackspace } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons";

const Step1 = () => {
  const { score, setScore } = useContext(ScoreContext);
  const { loggedIn } = useContext(LoginContext);
  const [waitingForApiResponse, setWaitingForApiResponse] = useState(false);
  const {
    setOpen,
    setSeverityKind,
    setNotificationMessage,
    open,
    notificationMessage,
    severityKind,
  } = useContext(NotificationContext);

  useEffect(() => {
    if (score.length === 0 && localStorage.getItem("score")) {
      setScore(JSON.parse(localStorage.getItem("score")));
    }
  }, [score, setScore]);

  const handleBackUp = async () => {
    const userId = localStorage.getItem("userId");

    const apiScore = {
      user: userId,
      title: `Ma super partition n°${Math.trunc(Math.random() * 10)}`,
      noteList: JSON.stringify(score),
    };

    try {
      setWaitingForApiResponse(true);
      const apiResponse = await saveNewUserData(apiScore, "score");

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
    if (score.length > 0) {
      localStorage.removeItem("score");

      const scoreTmp = [...score];
      scoreTmp.splice(score.length - 1, 1);
      setScore(scoreTmp);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("score");
    setScore([]);
  };

  const goToNextStep = () => {
    localStorage.setItem("score", JSON.stringify(score));
  };

  return (
    <section id="step1" className="main-content">
      <AlertModal modalOpen={open} closeModal={()=>setOpen(false)}>
        {notificationMessage}
        <ResponseIcon severityKind={severityKind} />
      </AlertModal>
      <p className="instruction">
        <span className="round-icon">1</span>J'écris ma partition rythmique en
        cliquant sur les notes ci-dessous.
      </p>
      <InscriptionHook step={1} />
      <AvailableNotesContainer />
      {loggedIn && waitingForApiResponse && (
        <Loader type="TailSpin" color="#2ca4a0ff" height={30} width={30} />
      )}
      <FontAwesomeIcon
        id="save-button"
        className={`edition-button hidden ${
          loggedIn && !waitingForApiResponse ? "visible" : ""
        }`}
        icon={faSave}
        onClick={handleBackUp}
      />
      <FontAwesomeIcon
        className="edition-button"
        icon={faBackspace}
        onClick={handleBackspace}
      />
      <FontAwesomeIcon
        className="trash edition-button"
        icon={faTrash}
        onClick={handleReset}
      />

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
