import React from "react";
//styles
import "../stave/Staves.style.scss";
import AddedNote from "../stave/AddedNote";

const StaveStep1 = ({ id, partitionNotes }) => {
  // console.log("notes dans Stave " + JSON.stringify(partitionNotes));
  if(partitionNotes){
    return (
      <div id={`stave-${id}`} className="stave">
        {partitionNotes.map((note, i) => {
          // console.log("note dans Stave " + JSON.stringify(note));
          return <AddedNote noteData={note} key={i} />;
        })}
      </div>
    );
  }
  return null;
};


export default StaveStep1;
