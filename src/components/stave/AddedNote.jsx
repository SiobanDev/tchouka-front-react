import React from "react";
//styles
import "./Staves.style.scss";

//context

const AddedNote = ({ noteData }) => {
  // console.log("noteData dans AddedNote " + JSON.stringify(noteData));
  if (noteData) {
    return (
      <img
        className="added-note"
        src={noteData.noteImage}
        alt="added-note"
        // style={{ width: `${addedNoteWidth}%`}}
      />
    );
  }

  console.log("error in AddedNote");
  return null;
};

export default AddedNote;
