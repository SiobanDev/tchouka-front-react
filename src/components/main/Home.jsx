import React, { useEffect, useContext } from "react";
import "./Home.scss";
import { step1Url } from "../../config/urlConstants";
import StepContext from "../../context/StepContext";
import NextStepButton from "./NextStepButton";
//styles
import "./StepButtons.style.scss";

const Home = () => {
  localStorage.clear();
  const { setCurrentStep } = useContext(StepContext);

  useEffect(() => {
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

      <div id="step-buttons-container">
        <NextStepButton
          handleClick={() => {}}
          nextPageUrl={step1Url}
          text="Je commence"
        />
      </div>
    </>
  );
};

export default Home;
