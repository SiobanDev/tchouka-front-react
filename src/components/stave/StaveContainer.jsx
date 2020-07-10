import React, { useContext, useEffect } from "react";
//styles
import "./Staves.style.scss";
//components
import Stave from "./Stave";
//context
import PartitionContext from "../../context/PartitionContext";
import { colouredStave } from "../../config/mediasConstants";

const StaveContainer = () => {
  const partitionContext = useContext(PartitionContext);
  const partition = partitionContext.partition;
  let firstStaveNotes = [];
  let secondStaveNotes = [];

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
        <Stave id="1" partitionNotes={firstStaveNotes} />
        <Stave id="2" partitionNotes={secondStaveNotes} />
      </div>
    );
  }

  return (
    <div className="staves-container">
      <img className="stave" src={colouredStave} alt="coloured-stave" />
      <img className="stave" src={colouredStave} alt="coloured-stave" />
    </div>
  );
};

export default StaveContainer;
