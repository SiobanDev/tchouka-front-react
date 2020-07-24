import React, { useContext } from "react";
//context
import PartitionContext from "../../context/PartitionContext";
//components
import StaveStep2 from "./StaveStep2";
import { blueStave } from "../../config/mediasConstants";

/**
 * Partition contains two staves made to receive the user's choosen notes.
 */
const Partition = () => {
  const chunkSize = 10;
  const {partition} = useContext(PartitionContext);
  let staveNumber = Math.trunc(partition.length / chunkSize);
  // console.log("staveNumber : " + staveNumber);
  let staveStep2List = [];
  let partitionToSplit = [];
  
  if (localStorage.getItem("partition")) {
    partitionToSplit = JSON.parse(localStorage.getItem("partition"));
  } else {
    partitionToSplit = [...partition];
  }

  for (let i = 0; i <= staveNumber; i++) {
    staveStep2List.push(
      <StaveStep2
        id={i}
        notesList={partitionToSplit.splice(0, chunkSize)}
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
