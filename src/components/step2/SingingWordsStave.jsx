import React, { useContext } from "react";
//styles
import "../stave/Staves.style.scss";
import CompositionContext from "../../context/CompositionContext";

const SingingWordsStave = () => {
  // console.log("notes dans Stave " + JSON.stringify(partitionNotes));
  const compositionContext = useContext(CompositionContext);
  const composition = compositionContext.composition;

//   useEffect(()=>{},[composition.length])

  return (
    <div className="word-stave">
      {composition.map((compositionItem, i) => {
        return (
          <div className="word-container" key={i}>
            {compositionItem.singingWord}
          </div>
        );
      })}
    </div>
  );
};

export default SingingWordsStave;
