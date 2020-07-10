import React from "react";

export default function AvailableNote({ imageSource, onClick }) {
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
