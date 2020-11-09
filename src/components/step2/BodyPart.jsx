import React from "react";

/**
 * Score contains two staves made to receive the user's choosen notes.
 */
const BodyPart = ({ name, handleClick }) => {
  if (name) {
    return (
      <div
        id={`body-part-${name}`}
        className="body-part"
        onClick={() => handleClick(name)}
      ></div>
    );
  }

  console.log("error in BodyPart");
  return null;
};

export default BodyPart;
