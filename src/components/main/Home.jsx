import React, { useEffect, useContext } from "react";
//Styles
import "./Home.style.scss";
import "../shared/StepButtons.style.scss";
//Constants
import { step1Url } from "../../config/urlConstants";
//Contexts
import StepContext from "../../context/StepContext";
import ScoreContext from "../../context/ScoreContext";
import CompositionContext from "../../context/CompositionContext";
//Components
import NextStepButton from "../shared/NextStepButton";
import InscriptionHook from "../shared/InscriptionHook";
//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  const { setCurrentStep } = useContext(StepContext);
  const { score, setScore } = useContext(ScoreContext);
  const { composition, setComposition } = useContext(CompositionContext);

  useEffect(() => {
    setCurrentStep(0);

    if (localStorage.getItem("score") || localStorage.getItem("composition")) {
      localStorage.removeItem("score");
      localStorage.removeItem("composition");
    }

    if (score.length > 0) {
      setScore([]);
    }
    if (composition.length > 0) {
      setComposition([]);
    }
  }, [
    composition.length,
    score.length,
    setComposition,
    setCurrentStep,
    setScore,
  ]);

  return (
    <section id="home" className="main-content">
      <h3>
        BONJOUR <FontAwesomeIcon icon={faSmile} /> !
      </h3>

      <p>
        Bienvenue sur Tchouka où tu vas pouvoir créer ton propre tutoriel de
        percussions corporelles.
      </p>

      <InscriptionHook step={0} />
      <p>Amuse-toi bien ;) </p>

      <div id="step-buttons-container">
        <NextStepButton
          handleClick={() => {}}
          nextPageUrl={step1Url}
          text="Je commence"
        />
      </div>
    </section>
  );
};

export default Home;
