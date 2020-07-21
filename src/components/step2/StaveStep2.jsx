import React, { useContext } from "react";
//styles
import "../stave/Staves.style.scss";
import AddedNote from "../stave/AddedNote";
import CompositionContext from "../../context/CompositionContext";
import { useEffect } from "react";
import SingingWordsStave from "./SingingWordsStave";

const StaveStep2 = ({ notesList, id }) => {
  // console.log("composition in StaveStep2 :" + JSON.stringify(composition));

  if (notesList) {
    return (
      <>
        <SingingWordsStave />
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
