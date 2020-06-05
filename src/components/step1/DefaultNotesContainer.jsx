import React, { useContext, useEffect, useState } from "react";
//services
import { getDefaultNotes } from "../../utils/utils";
//context
import PartitionContext from "../../context/PartitionContext";
import NotesToChoose from "./NoteToChoose";
//styles
import "./DefaultNotesContainer.style.scss";
//constants


export const DefaultNotesContainer = () => {
  let [availableNotes, setAvailableNotes] = useState([]);
  const partitionContext = useContext(PartitionContext);
  const partition = partitionContext.partition;
  const setPartition = partitionContext.setPartition;
  let allNotesWidth = partitionContext.allNotesWidth;
  let setAllNotesWidth = partitionContext.setAllNotesWidth;
  const addedNoteWidth = partitionContext.addedNoteWidth;
  const defaultNotesCaptionList = [
    "4 temps",
    "2 temps",
    "1 temps",
    "1/2 temps",
    "1/4 temps",
  ];
  const getNotes = async () => {
    try {
      const notes = await getDefaultNotes();
      setAvailableNotes(notes.reverse());
    } catch (e) {
      console.log("Error in getNotes in DefaultNotesContainer : " + e);
    }
  };

  console.log("defaultNotesCaptionList : " + defaultNotesCaptionList);

  useEffect(() => {
    getNotes();
  }, []);

  console.log(
    "availableNotes in NotesToChoose : " + JSON.stringify(availableNotes)
  );

  if (
    availableNotes &&
    availableNotes.length > 0 &&
    defaultNotesCaptionList
  ) {
    return (
      <div id="notes-to-choose-container">
        {availableNotes.map((note, i) => {
            return (
              <div className="available-note-container" key={note.id}>
                <NotesToChoose
                  imageSource={note.noteImage}
                  onClick={() => {
                    setPartition([...partition, note]);
                    setAllNotesWidth(allNotesWidth + addedNoteWidth);
                  }}
                />
                <p className="note-caption">{defaultNotesCaptionList[i]}</p>
              </div>
            );
         
        })}
      </div>
    );
  }

  return null;
};

export default DefaultNotesContainer;
