import React, { useContext } from "react";
//styles
import "./Step2.style.scss";
//components
import Partition from "./Partition";
import ModelJP from "./ModelJP";
import NextStep from "../main/NextStep";
import StepContext from "../../context/StepContext";
import { step3Url } from "../../config/urlConstants";

export default function Step2() {
  const stepContext = useContext(StepContext);

  const handleClick = () =>{
    stepContext.setEndedStep(2);
  }
    return (
        <section id="step2">
          <ModelJP />
          <Partition />
          <NextStep handleClick={handleClick} nextPageUrl={step3Url}/>
        </section>
      );
}