import React, { useContext, useEffect, useState } from "react";
//data
import { getDefaultNotes } from "../../utils/utils";
//context
import PartitionContext from "../../context/PartitionContext";
import NotesToChoose from "./NoteToChoose";
//styles
import "./DefaultNotesContainer.style.scss";

export const DefaultNotesContainer = () => {
  let [availableNotes, setAvailableNotes] = useState([]);
  const partitionContext = useContext(PartitionContext);
  const partition = partitionContext.partition;
  const setPartition = partitionContext.setPartition;
  let allNotesWidth = partitionContext.allNotesWidth;
  let setAllNotesWidth = partitionContext.setAllNotesWidth;
  const addedNoteWidth = partitionContext.addedNoteWidth;
  const getNotes = async () => {
    const notes = await getDefaultNotes();
    setAvailableNotes(notes);
  };

  useEffect(() => {
    getNotes();
  }, []);

  console.log(
    "availableNotes in NotesToChoose : " + JSON.stringify(availableNotes)
  );

  if (availableNotes && availableNotes.length > 0) {
    return (
      <div id="notes-to-choose-container">
        {availableNotes.map((note) => {
          return (
            <NotesToChoose
              imageSource={note.noteImage}
              onClick={() => {
                setPartition([...partition, note]);
                setAllNotesWidth(allNotesWidth + addedNoteWidth);
              }}
              key={note.id}
            />
          );
        })}
      </div>
    );
  }

  return null;
};

export default DefaultNotesContainer;
