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

const ModelJP = () => {
  const partitionContext = useContext(PartitionContext);
  const partition = partitionContext.partition;
  const compositionContext = useContext(CompositionContext);
  const [clickNumber, setClickNumber] = useState(0);

  const createComposition = (name) => {
    setClickNumber(clickNumber + 1);

    if (partition.length > 0 && clickNumber < partition.length) {
      const newCompositionItem = {
        id: partition[clickNumber].id,
        duration: partition[clickNumber].duration,
        movementList: movementList[name],
        singingWord: name,
        sound: soundList[name],
      };

      compositionContext.setComposition(composition => [...composition, newCompositionItem])
      console.log("composition in BodyPart :" + JSON.stringify(compositionContext.composition));
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
          <BodyPart name={bodyPart} handleClick={createComposition} key={i} />
        ))}
      </div>
    );
  }
  console.log("error in ModelJP");
  return null;
};

export default ModelJP;
