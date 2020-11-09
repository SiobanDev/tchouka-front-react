import React, { useContext, useEffect } from "react";
//Contexts
import CompositionContext from "../../context/CompositionContext";
import ScoreContext from "../../context/ScoreContext";
//Components
import StaveStep2 from "./StaveStep2";
//Constants
import { blueStave } from "../../config/mediasConstants";

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

  //TO DO : consider the case where two exact movements follow : insert neutral position between them;
};

export default Score;
