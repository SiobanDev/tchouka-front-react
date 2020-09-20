import React from "react";

const initialContextValues = {
  score: [],
  setScore: () => {},
  freeTime: 42,
  allNotesWidth: 0,
  setAllNotesWidth: ()=>{},
  addedNoteWidth: 5
};

const ScoreContext = React.createContext(initialContextValues);

export default ScoreContext;
