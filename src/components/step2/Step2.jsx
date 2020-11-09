import React, { useContext, useState, useEffect } from "react";
//Styles
import "./Step2.style.scss";
import "../shared/StepButtons.style.scss";
//Components
import Score from "./Score";
import ModelJP from "./ModelJP";
import PreviousStepButton from "../shared/PreviousStepButton";
import NextStepButton from "../shared/NextStepButton";
import InscriptionHook from "../shared/InscriptionHook";
import AlertModal from "../shared/AlertModal";
import ResponseIcon from "../shared/ResponseIcon";
//Constants
import { step3Url, step1Url } from "../../config/urlConstants";
//Contexts
import CompositionContext from "../../context/CompositionContext";
import LoginContext from "../../context/LoginContext";
import NotificationContext from "../../context/NotificationContext";
//Utils
import { adaptComposition } from "./Step2.utils";
import { saveNewUserData } from "../../services/apiServices";
//Libraries
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faBackspace,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Step2 = () => {
  const { loggedIn } = useContext(LoginContext);
  const { composition, setComposition, setIsLastItemRemoved } = useContext(
    CompositionContext
  );
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
    if (composition.length === 0 && localStorage.getItem("composition")) {
      setComposition(JSON.parse(localStorage.getItem("composition")));
    }
  }, [composition, setComposition]);

  const handleBackUp = async () => {
    const userId = localStorage.getItem("userId");

    const apiComposition = {
      user: userId,
      title: `Ma super composition n°${Math.floor(Math.random() * 10)}`,
      movementList: JSON.stringify(composition),
    };

    try {
      setWaitingForApiResponse(true);
      const apiResponse = await saveNewUserData(apiComposition, "composition");

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
    localStorage.removeItem("composition");

    if (composition.length > 0) {
      const compositionTmp = [...composition];
      compositionTmp.splice(composition.length - 1, 1);
      setComposition(compositionTmp);
      setIsLastItemRemoved(true);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("composition");
    setComposition([]);
  };

  const goToPreviousStep = () => {
    localStorage.removeItem("composition");
    setComposition([]);
  };

  const goToNextStep = () => {
    adaptComposition(composition, setComposition);
    localStorage.setItem("composition", JSON.stringify(composition));
  };

  return (
    <section id="step2" className="main-content">
      <AlertModal modalOpen={open} closeModal={()=>setOpen(false)}>
        {notificationMessage}
        <ResponseIcon severityKind={severityKind} />
      </AlertModal>

      <div id="column1">
        <ModelJP />
      </div>
      <div id="column2">
        <p className="instruction">
          <span className="round-icon">2</span>Je clique sur les parties du
          corps de Jean-Patricia pour les associer à mes notes.
        </p>
        <InscriptionHook step={2} />
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
        <div className="staves-container">
          <Score />
        </div>
      </div>

      <div id="step-buttons-container">
        <PreviousStepButton
          handleClick={goToPreviousStep}
          previousPageUrl={step1Url}
          text="Étape précédente"
        />
        <NextStepButton
          handleClick={goToNextStep}
          nextPageUrl={step3Url}
          text="Étape suivante"
        />
      </div>
    </section>
  );
};

export default Step2;
