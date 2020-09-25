import React, { useContext} from "react";
//context
import ScoreContext from "../../context/ScoreContext";
import AvailableNote from "./AvailableNote";
//styles
import "./AvailableNotesContainer.style.scss";
//libraries
import { defaultAvailableNotes } from "../../data/defaultNotes";

export const AvailableNotesContainer = () => {
  const {
    score,
    setScore,
    allNotesWidth,
    setAllNotesWidth,
    addedNoteWidth,
  } = useContext(ScoreContext);
  
  // console.log("score in AvailabreContainer :" + JSON.stringify(score))

      return (
        <div id="notes-to-choose-container">
          {defaultAvailableNotes.map((note, i) => (
            <div className="available-note-container" key={note.id}>
              <AvailableNote
                imageSource={note.imageSrc}
                onClick={() => {
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
