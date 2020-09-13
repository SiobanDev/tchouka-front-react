import React, { useEffect, useContext } from "react";
import "./Home.scss";
import { step1Url } from "../../config/urlConstants";
import StepContext from "../../context/StepContext";
import NextStepButton from "./NextStepButton";
//styles
import "./StepButtons.style.scss";
import PartitionContext from "../../context/PartitionContext";
import CompositionContext from "../../context/CompositionContext";

const Home = () => {
  const { setCurrentStep } = useContext(StepContext);
  const { partition, setPartition } = useContext(PartitionContext);
  const { composition, setComposition } = useContext(
    CompositionContext
  );

  useEffect(() => {
    setCurrentStep(0);

    if(localStorage.getItem("partition") || localStorage.getItem("composition")){
      localStorage.clear();
    }

    if (partition.length > 0) {
      setPartition([]);
    }
    if (composition.length > 0) {
      setComposition([]);
    }
  }, [
    composition.length,
    partition.length,
    setComposition,
    setCurrentStep,
    setPartition,
  ]);

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
