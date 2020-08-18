import React, { useState } from "react";
//images
import {
  jpNeutre,
  jpNeutreTransp,
  bodyPartList,
} from "../../config/mediasConstants";
// import {
//   jpNeutre,
//   jpNeutreTransp,
//   claImages,
//   bouImages,
//   douImages,
//   pouImages,
//   soundList,
//   movementList,
//   bodyPartList,
// } from "../../config/mediasConstants";
//styles
import "./ModelJP.style.scss";
import BodyPart from "./BodyPart";
import { useContext } from "react";
import PartitionContext from "../../context/PartitionContext";
import CompositionContext from "../../context/CompositionContext";
import { useEffect } from "react";
import {
  handleClickOnBodyPart,
} from "./ModelJP.service";

const ModelJP = () => {
  const { partition } = useContext(PartitionContext);
  const {
    composition,
    setComposition,
    isLastItemRemoved,
    setIsLastItemRemoved,
  } = useContext(CompositionContext);
  const [clickNumber, setClickNumber] = useState(0);
  const [movementImageToDisplay, setMovementImageToDisplay] = useState([]);

  useEffect(() => {
    if (isLastItemRemoved) {
      setClickNumber(clickNumber - 1);
      setIsLastItemRemoved(false);
    }

    if (composition.length === 0) {
      setClickNumber(0);
    }
  }, [
    composition,
    clickNumber,
    isLastItemRemoved,
    setClickNumber,
    setIsLastItemRemoved,
  ]);

  // console.log(
  //   "movementImageToDisplay in general : " +
  //     JSON.stringify(movementImageToDisplay)
  // );

  if (movementImageToDisplay.length > 0) {
    return (
      <div className="model-container">
        {movementImageToDisplay}
        <img className="model neutral-model" src={jpNeutre} alt="neutral-model" />
        {bodyPartList.map((bodyPart, i) => (
          <BodyPart
            name={bodyPart}
            handleClick={() => {
              handleClickOnBodyPart(
                bodyPart,
                clickNumber,
                setClickNumber,
                partition,
                composition,
                setComposition,
                movementImageToDisplay,
                setMovementImageToDisplay
              );
            }}
            key={i}
          />
        ))}
      </div>
    );
  } else if (bodyPartList) {
    return (
      <div className="model-container">
        <img
          className="model model-transp"
          src={jpNeutreTransp}
          alt="neutral-model"
        />
        <img className="model neutral-model" src={jpNeutre} alt="neutral-model" />
        {bodyPartList.map((bodyPart, i) => (
          <BodyPart
            name={bodyPart}
            handleClick={() => {
              handleClickOnBodyPart(
                bodyPart,
                clickNumber,
                setClickNumber,
                partition,
                composition,
                setComposition,
                movementImageToDisplay,
                setMovementImageToDisplay
              );
            }}
            key={i}
          />
        ))}
      </div>
    );
  }
  console.log("error in ModelJP");
  return null;
};

export default ModelJP;
