import React from "react";
//Styles
import "./Staves.style.scss";

//context

const AddedNote = ({ noteData }) => {
  if (noteData) {
    return (
      <img
        className="added-note"
        src={noteData.imageSrc}
        alt="added-note"
      />
    );
  }

  console.log("error in AddedNote");
  return null;
};

export default AddedNote;
