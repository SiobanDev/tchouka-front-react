import React from "react";
//styles
import "./Step1.style.scss";
//components
import DefaultNotesContainer from "./DefaultNotesContainer";
import StaveContainer from "../stave/StaveContainer";

const Step1 = () => {
  return (
    <section id="step1">
      <p className="instruction"><span className="round-icon">1</span>J'écris ma parition rythmique en cliquant sur les notes.</p>
      <DefaultNotesContainer />
      <StaveContainer partition={[]} />
    </section>
  );
};

export default Step1;
