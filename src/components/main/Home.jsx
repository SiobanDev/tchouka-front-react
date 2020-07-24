import React, { useEffect, useContext } from "react";
import "./Home.scss";
import { updateNavIconStyle } from "./Nav.service";
import NextStepButton from "./NextStepButton";
import { step1Url } from "../../config/urlConstants";
import StepContext from "../../context/StepContext";
import { Link } from "react-router-dom";
import StepButtons from "./StepButtons";

const Home = () => {
  localStorage.clear();
  const {setCurrentStep} = useContext(StepContext);

  useEffect(() => {
    console.log("useEffect dans Home");
    setCurrentStep(0);
  }, [setCurrentStep]);

  return (
    <>
      <h3>BONJOUR !</h3>
      <p>
        Bienvenue sur Tchouka où tu vas pouvoir créer ton propre tutoriel de
        percussions corporelles.
      </p>

      <p>Amuse-toi bien ;) ! </p>
      <StepButtons
        IsNextButton={true}
        IsPreviousButton={false}
        isHomeButton={true}
        goToPreviousStep={() => {}}
        goToNextStep={() => {}}
        previousStepUrl={""}
        nextStepUrl={step1Url}
      />
    </>
  );
};

export default Home;
