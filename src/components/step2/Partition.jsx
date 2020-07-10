import React, { useContext } from "react";
//context
import PartitionContext from "../../context/PartitionContext";
//components
import StaveContainer from "../stave/StaveContainer";

/**
 * Partition contains two staves made to receive the user's choosen notes.
 */
const Partition = () => {
  const partitionContext = useContext(PartitionContext);
  const partition = partitionContext.partition;
  console.log("partition dans Partition : " + JSON.stringify(partition))

  // partition.map((note) => {
  //TO DO : consider the case where two exact movements follow : insert neutral position between them;

  //   return null;
  // });

  return <StaveContainer partition={partition}/>;
};

export default Partition;
