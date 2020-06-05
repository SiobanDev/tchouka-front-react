import React, { useContext } from "react";
//styles
import "./Staves.style.css";

//context
import PartitionContext from "../../context/PartitionContext";

const AddedNote = ({ noteData }) => {
  const partitionContext = useContext(PartitionContext);
  const addedNoteWidth = partitionContext.addedNoteWidth;

  // console.log("noteData dans AddedNote " + JSON.stringify(noteData));

    return (
      <img
        className="added-note"
        src={noteData.image}
        alt="added-note"
        style={{ width: `${addedNoteWidth}%`}}
      />
    );

};

export default AddedNote;
