import React from "react";
//Styles
import "../stave/Staves.style.scss";

const SingingWordsStave = ({ singingWordList }) => {
  return (
    <div className="word-stave">
      {singingWordList.map((singingWord, i) => (
        <div className="word-container" key={i}>
          {singingWord}
        </div>
      ))}
    </div>
  );
};

export default SingingWordsStave;
