import React, { useState, useContext } from "react";
//Assets
import {
  jpNeutre,
  jpNeutreTransp,
  bodyPartList,
} from "../../config/mediasConstants";
//Styles
import "./ModelJP.style.scss";
//Components
import BodyPart from "./BodyPart";
//Contexts
import ScoreContext from "../../context/ScoreContext";
import CompositionContext from "../../context/CompositionContext";
//Utils
import { handleClickOnBodyPart } from "./ModelJP.service";

const ModelJP = () => {
  const { score } = useContext(ScoreContext);
  const { composition, setComposition } = useContext(CompositionContext);
  const [movementImageToDisplay, setMovementImageToDisplay] = useState([]);

  return (
    <div className="model-container">
      {movementImageToDisplay.length > 0 ? (
        movementImageToDisplay
      ) : (
        <img
          className="model model-transp"
          src={jpNeutreTransp}
          alt="neutral-model"
        />
      )}
      <img className="model neutral-model" src={jpNeutre} alt="neutral-model" />
      {bodyPartList.map((bodyPart, i) => (
        <BodyPart
          name={bodyPart}
          handleClick={() => {
            handleClickOnBodyPart(
              bodyPart,
              score,
              composition,
              setComposition,
              setMovementImageToDisplay
            );
          }}
          key={i}
        />
      ))}
    </div>
  );
};

export default ModelJP;
