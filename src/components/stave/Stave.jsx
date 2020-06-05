import React from "react";
//styles
import "./Staves.style.scss";
import AddedNote from "./AddedNote";

const Stave = ({ id, partitionNotes }) => {
  // console.log("notes dans Stave " + JSON.stringify(partitionNotes));

  return (
    <div id={`stave-${id}`} className="stave">
      {partitionNotes.map((note, i) => {
          // console.log("note dans Stave " + JSON.stringify(note));
        return (
          <AddedNote
            noteData={note}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default Stave;
