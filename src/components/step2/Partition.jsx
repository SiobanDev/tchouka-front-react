import React, { useContext } from "react";
//context
import PartitionContext from "../../context/PartitionContext";
//components
import StaveStep2 from "./StaveStep2";
import { blueStave } from "../../config/mediasConstants";
import CompositionContext from "../../context/CompositionContext";

/**
 * Partition contains two staves made to receive the user's choosen notes.
 */
const Partition = () => {
  const chunkSize = 10;
  const { partition } = useContext(PartitionContext);
  const { composition } = useContext(CompositionContext);
  let staveNumber = Math.trunc(partition.length / chunkSize);
  let staveStep2List = [];
  let partitionToSplit = [];
  let tempComposition = [];
  let singingWordListToSplit = [];

  // console.log("staveNumber : " + staveNumber);

  if (localStorage.getItem("partition")) {
    partitionToSplit = JSON.parse(localStorage.getItem("partition"));
  } else {
    partitionToSplit = [...partition];
  }

  if (localStorage.getItem("composition")) {
    tempComposition = JSON.parse(localStorage.getItem("composition"));
  } else {
    tempComposition = [...composition];
  }

  singingWordListToSplit = tempComposition.map((compositionItem) => {
    return compositionItem.singingWord;
  });

  for (let i = 0; i <= staveNumber; i++) {
    staveStep2List.push(
      <StaveStep2
        id={i}
        notesList={partitionToSplit.splice(0, chunkSize)}
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

export default Partition;
