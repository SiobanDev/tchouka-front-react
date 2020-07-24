import React, { useContext, useEffect } from "react";
//styles
import "../stave/Staves.style.scss";
//components
import StaveStep1 from "./StaveStep1";
//context
import PartitionContext from "../../context/PartitionContext";
import { redStave } from "../../config/mediasConstants";

const StaveContainerStep1 = () => {
  const {partition} = useContext(PartitionContext);
  let firstStaveNotes = [];
  let secondStaveNotes = [];

  console.log("partition dans StaveContainerStep1 : " + partition);

  if (partition.length > 0) {
    firstStaveNotes = partition.slice(0, 20);
    secondStaveNotes = partition.slice(20, 39);

    // console.log("firstStaveNotes dans StaveContainer " + JSON.stringify(firstStaveNotes));
  }

  useEffect(() => {}, [partition]);

  // console.log("partition dans StaveContainer " + JSON.stringify(partition));
  if (partition.length > 0) {
    return (
      <div className="staves-container">
        <StaveStep1 id="1" partitionNotes={firstStaveNotes} />
        <StaveStep1 id="2" partitionNotes={secondStaveNotes} />
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
