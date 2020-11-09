import React from "react";
//Styles
import "../stave/Staves.style.scss";
//Components
import AddedNote from "../stave/AddedNote";

const StaveStep1 = ({ id, scoreNotes }) => {
  if (scoreNotes) {
    return (
      <div id={`stave-${id}`} className="stave">
        {scoreNotes.map((note, i) => {
          return <AddedNote noteData={note} key={i} />;
        })}
      </div>
    );
  }
  return null;
};

export default StaveStep1;
