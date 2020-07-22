import React from "react";

const AvailableNote = ({ imageSource, onClick }) => {
  return (
    <div onClick={onClick}>
      <img
        className="note-to-choose"
        src={imageSource}
        alt="musical-note"
      />
    </div>
  );
}

export default AvailableNote;