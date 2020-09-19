import React, { useContext, useEffect } from "react";
//context
import ScoreContext from "../../context/ScoreContext";
//components
import StaveStep2 from "./StaveStep2";
import { blueStave } from "../../config/mediasConstants";
import CompositionContext from "../../context/CompositionContext";

/**
 * Score contains two staves made to receive the user's choosen notes.
 */
const Score = () => {
  const chunkSize = 10;
  const { score, setScore } = useContext(ScoreContext);
  const { composition } = useContext(CompositionContext);
  const staveNumber = Math.trunc(score.length / chunkSize);
  const staveStep2List = [];
  let scoreToSplit = [...score];
  let tempComposition = [...composition];
  let singingWordListToSplit = [];

  // console.log("staveNumber : " + staveNumber);

  useEffect(() => {
    if (score.length === 0 && localStorage.getItem("score")) {
      setScore(JSON.parse(localStorage.getItem("score")));
    }
  }, [score.length, setScore]);

  singingWordListToSplit = tempComposition.map((compositionItem) => {
    return compositionItem.singingWord;
  });

  for (let i = 0; i <= staveNumber; i++) {
    staveStep2List.push(
      <StaveStep2
        id={i}
        notesList={scoreToSplit.splice(0, chunkSize)}
        singingWordList={singingWordListToSplit.splice(0, chunkSize)}
        key={i}
      />
    );
  }

  if (staveStep2List.length > 0) {
    return staveStep2List;
  }

  return <img className="stave" src={blueStave} alt="coloured-stave" />;
};

export default Score;