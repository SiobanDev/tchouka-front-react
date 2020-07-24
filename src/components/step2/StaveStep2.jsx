import React from "react";
//styles
import "../stave/Staves.style.scss";
import AddedNote from "../stave/AddedNote";
import SingingWordsStave from "./SingingWordsStave";

const StaveStep2 = ({ id, notesList, singingWordList }) => {
  // console.log("composition in StaveStep2 :" + JSON.stringify(composition));

  if (notesList) {
    return (
      <>
        <SingingWordsStave singingWordList={singingWordList} />
        <div id={`stave-${id}`} className="stave note-stave">
          {notesList.map((note, i) => {
            return <AddedNote noteData={note} key={i} />;
          })}
        </div>
      </>
    );
  }
  console.log("error in StaveStep2");
  return null;
};

export default StaveStep2;
