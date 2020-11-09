import React, { useContext } from "react";
//Contexts
import ScoreContext from "../../context/ScoreContext";
//Components
import AvailableNote from "./AvailableNote";
//Styles
import "./AvailableNotesContainer.style.scss";
//Data
import { defaultAvailableNotes } from "../../data/defaultNotes";

export const AvailableNotesContainer = () => {
  const {
    score,
    setScore,
    allNotesWidth,
    setAllNotesWidth,
    addedNoteWidth,
  } = useContext(ScoreContext);

  return (
    <div id="notes-to-choose-container">
      {defaultAvailableNotes.map((note, i) => (
        <div className="available-note-container" key={note.id}>
          <AvailableNote
            imageSource={note.imageSrc}
            onClick={() => {
              localStorage.getItem("score") && localStorage.removeItem("score");

              const newScoreNote = {
                id: score.length,
                duration: note.duration,
                imageSrc: note.imageSrc,
              };

              setScore([...score, newScoreNote]);
              setAllNotesWidth(allNotesWidth + addedNoteWidth);
            }}
          />
          <p className="note-caption">{note.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default AvailableNotesContainer;
