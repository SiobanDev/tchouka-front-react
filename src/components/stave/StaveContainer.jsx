import React, { useContext } from "react";
//styles
import "./Staves.style.css";
//components
import Stave from "./Stave";
//context
import PartitionContext from "../../context/PartitionContext";

const StaveContainer = ({partition}) => {
  const partitionContext = useContext(PartitionContext);
  partition = partitionContext.partition;
  let firstStaveNotes = [];
  let secondStaveNotes = [];

  console.log("partition " + JSON.stringify(partition));
  console.log("allNotesWidth " + partitionContext.allNotesWidth);

  if (partition.length > 0) {
    firstStaveNotes = partition.slice(0, 20);
    secondStaveNotes = partition.slice(20, 39);

    // console.log("firstStaveNotes dans StaveContainer " + JSON.stringify(firstStaveNotes));
  }

  // console.log("partition dans StaveContainer " + JSON.stringify(partition));

  return (
    <div className="staves-container">
      <Stave id="1" partitionNotes={firstStaveNotes} />
      <Stave id="2" partitionNotes={secondStaveNotes} />
    </div>
  );
};

export default StaveContainer;
