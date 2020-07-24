import React, { useState } from "react";
//images
import {
  jpNeutre,
  jpNeutreTransp,
  soundList,
  movementList,
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

const ModelJP = ({ backSpaceAction }) => {
  const { partition } = useContext(PartitionContext);
  const {
    composition,
    setComposition,
    isLastItemRemoved,
    setIsLastItemRemoved,
  } = useContext(CompositionContext);
  const [clickNumber, setClickNumber] = useState(0);

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

  const createComposition = (name) => {
    console.log("clickNumber in create: " + clickNumber);

    if (partition.length > 0 && clickNumber < partition.length) {
      setClickNumber(clickNumber + 1);

      const newCompositionItem = {
        id: partition[clickNumber].id,
        duration: partition[clickNumber].duration,
        movementList: movementList[name],
        singingWord: name,
        sound: soundList[name],
      };

      setComposition((composition) => [...composition, newCompositionItem]);
      // console.log("composition in ModelJP :" + JSON.stringify(composition));
    }
  };

  const playSoundOfBodyPart = (name) => {
    if (partition.length !== composition.length) {
      const soundOfBodyPart = new Audio(soundList[name]);
      soundOfBodyPart.volume = 0.5;
      soundOfBodyPart.play();
    }
  };

  if (bodyPartList) {
    return (
      <div className="model-container">
        <img
          className="model model-transp"
          src={jpNeutreTransp}
          alt="neutral-model"
        />
        {/* <img className="model" src={pouImages[0]} alt="neutral-model" /> */}
        {/* <img className="model" src={douImages[0]} alt="neutral-model" /> */}
        {/*<img className="model" src={bouImages[0]} alt="neutral-model" /> */}
        {/* <img className="model" src={claImages[0]} alt="neutral-model" /> */}
        <img className="model" src={jpNeutre} alt="neutral-model" />
        {bodyPartList.map((bodyPart, i) => (
          <BodyPart
            name={bodyPart}
            handleClick={(bodyPart) => {
              createComposition(bodyPart);
              playSoundOfBodyPart(bodyPart);
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
