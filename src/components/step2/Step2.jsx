import React, { useContext, useState } from "react";
//styles
import "./Step2.style.scss";
//components
import Score from "./Score";
import ModelJP from "./ModelJP";
import StepContext from "../../context/StepContext";
import { step3Url, step1Url, apiScoreUrl } from "../../config/urlConstants";
import CompositionContext from "../../context/CompositionContext";
import { useEffect } from "react";
import PreviousStepButton from "../shared/PreviousStepButton";
import NextStepButton from "../shared/NextStepButton";
//styles
import "../shared/StepButtons.style.scss";
import { percussionStep } from "../../config/mainConstants";
import { adaptComposition } from "./Step2.utils";
import LoginContext from "../../context/LoginContext";
import { saveNewComposition } from "../../services/apiServices";
import NotificationContext from "../../context/NotificationContext";
//libraries
import Loader from "react-loader-spinner";
import InscriptionHook from "../shared/InscriptionHook";

const Step2 = () => {
  const { loggedIn } = useContext(LoginContext);
  const { setCurrentStep } = useContext(StepContext);
  const { composition, setComposition, setIsLastItemRemoved } = useContext(
    CompositionContext
  );
  const [waitingForApiResponse, setWaitingForApiResponse] = useState(true);
  const { setOpen, setSeverityKind, setNotificationMessage } = useContext(
    NotificationContext
  );
  const handleBackUp = async () => {
    const userId = localStorage.getItem("userId");

    const apiComposition = {
      user: userId,
      title: `Ma super composition n°${Math.floor(Math.random() * 10)}`,
      movementList: JSON.stringify(composition),
    };

    try {
      setWaitingForApiResponse(true);
      const apiResponse = await saveNewComposition(apiComposition);

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
    if (composition.length > 0) {
      const compositionTmp = [...composition];
      compositionTmp.splice(composition.length - 1, 1);
      setComposition(compositionTmp);

      console.log(
        "composition dans Step2 after backspace " +
          JSON.stringify(composition, null, " ")
      );

      setIsLastItemRemoved(true);
    }
  };

  const handleReset = () => {
    setComposition([]);
    localStorage.removeItem("composition");
  };

  const goToPreviousStep = () => {
    localStorage.removeItem("composition");
    setComposition([]);
  };

  const goToNextStep = () => {
    adaptComposition(composition, setComposition);
    localStorage.setItem("composition", JSON.stringify(composition));
  };

  useEffect(() => {
    if (composition.length === 0 && localStorage.getItem("composition")) {
      setComposition(JSON.parse(localStorage.getItem("composition")));
    }
    setCurrentStep(percussionStep);
  }, [composition, setComposition, setCurrentStep]);

  console.log("composition in Step2 :" + JSON.stringify(composition));

  return (
    <section id="step2" className="main-content">
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
