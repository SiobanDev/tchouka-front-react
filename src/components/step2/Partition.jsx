import React, { useContext, useEffect } from "react";
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
  const { partition, setPartition } = useContext(PartitionContext);
  const { composition } = useContext(CompositionContext);
  const staveNumber = Math.trunc(partition.length / chunkSize);
  const staveStep2List = [];
  let partitionToSplit = [...partition];
  let tempComposition = [...composition];
  let singingWordListToSplit = [];

  // console.log("staveNumber : " + staveNumber);

  useEffect(() => {
    if (partition.length === 0 && localStorage.getItem("partition")) {
      setPartition(JSON.parse(localStorage.getItem("partition")));
    }
  }, [partition.length, setPartition]);

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