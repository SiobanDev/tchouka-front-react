import React, { useContext, useEffect, useState, useCallback } from "react";
//services
import { apiFetchDefaultNotes } from "../../services/apiServices";
//context
import PartitionContext from "../../context/PartitionContext";
import AvailableNote from "./AvailableNote";
//styles
import "./AvailableNotesContainer.style.scss";
//libraries
import Loader from "react-loader-spinner";

export const AvailableNotesContainer = () => {
  let [availableNotes, setAvailableNotes] = useState([]);
  const {
    partition,
    setPartition,
    allNotesWidth,
    setAllNotesWidth,
    addedNoteWidth,
  } = useContext(PartitionContext);
  const [waitingForApiResponse, setWaitingForApiResponse] = React.useState(
    true
  );

  const defaultNotesCaptionList = [
    "4 temps",
    "2 temps",
    "1 temps",
    "1/2 temps",
  ];

  const getNotes = useCallback(async () => {
    try {
      const formattedApiResponse = await apiFetchDefaultNotes();
      if (formattedApiResponse) {
        setAvailableNotes(formattedApiResponse.data.reverse());
      }
      setWaitingForApiResponse(false);
    } catch (e) {
      setWaitingForApiResponse(false);
      console.log("Error in getNotes in AvailableNotesContainer : " + e);
    }
  }, []);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  if (availableNotes.length === 0 && !waitingForApiResponse) {
    return (
      <p className="error-message">
        <i className="fas fa-exclamation-triangle"></i> Erreur pour le
        téléchargement des notes
      </p>
    );
  } else if (
    availableNotes &&
    availableNotes.length > 0 &&
    defaultNotesCaptionList &&
    !waitingForApiResponse
  ) {
    return (
      <div id="notes-to-choose-container">
        {availableNotes.map((note, i) => {
          return (
            <div className="available-note-container" key={note.id}>
              <AvailableNote
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

  return <Loader type="TailSpin" color="#2ca4a0ff" height={45} width={45} />;
};

export default AvailableNotesContainer;
