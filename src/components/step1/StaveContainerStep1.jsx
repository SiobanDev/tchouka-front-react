import React, { useContext, useEffect } from "react";
//styles
import "../stave/Staves.style.scss";
//components
import StaveStep1 from "./StaveStep1";
//context
import ScoreContext from "../../context/ScoreContext";
import { redStave } from "../../config/mediasConstants";

const StaveContainerStep1 = () => {
  const { score, setScore } = useContext(ScoreContext);

  useEffect(() => {
    if (typeof score === "string") {
      const scoreTmp = score;
      JSON.parse(scoreTmp);
      setScore(scoreTmp);
    }
  }, [score, setScore]);

  let firstStaveNotes = [];
  let secondStaveNotes = [];

  if (score.length > 0) {
    firstStaveNotes = score.slice(0, 20);
    secondStaveNotes = score.slice(20, 39);
  }

  if (score.length > 0) {
    return (
      <div className="staves-container">
        <StaveStep1 id="1" scoreNotes={firstStaveNotes} />
        <StaveStep1 id="2" scoreNotes={secondStaveNotes} />
      </div>
    );
  }

  return (
    <div className="staves-container">
      <img className="stave" src={redStave} alt="coloured-stave" />
    </div>
  );
};

export default StaveContainerStep1;
