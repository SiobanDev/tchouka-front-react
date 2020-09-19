import React, { useEffect, useContext } from "react";
import "./Home.scss";
import { step1Url } from "../../config/urlConstants";
import StepContext from "../../context/StepContext";
import NextStepButton from "./NextStepButton";
//styles
import "./StepButtons.style.scss";
import ScoreContext from "../../context/ScoreContext";
import CompositionContext from "../../context/CompositionContext";

const Home = () => {
  const { setCurrentStep } = useContext(StepContext);
  const { score, setScore } = useContext(ScoreContext);
  const { composition, setComposition } = useContext(
    CompositionContext
  );

  useEffect(() => {
    setCurrentStep(0);

    if(localStorage.getItem("score") || localStorage.getItem("composition")){
      localStorage.clear();
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
    </section>
  );
};

export default Home;
