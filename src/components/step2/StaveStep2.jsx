import React from "react";
//Styles
import "../stave/Staves.style.scss";
//Components
import AddedNote from "../stave/AddedNote";
import SingingWordsStave from "./SingingWordsStave";

const StaveStep2 = ({ id, notesList, singingWordList }) => {
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
