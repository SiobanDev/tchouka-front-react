import React from "react";
//components
//data
//styles
import "./Step3.style.scss";
//libraries
import { motion } from "framer-motion";
import { compositionData } from "../../mocks/compositionData";

export const MovementImages = ({ count, playingAnimation, controls }) => {
  const allMovementSrcList = [];
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  compositionData.forEach((compositionItem) => {
    compositionItem.movementList.forEach((noteMovementSrc) => {
      allMovementSrcList.push(noteMovementSrc);
    });
  });

  return (
    <>
      <img
        id="first-movement-image"
        className={
          playingAnimation ? "movement-image hidden" : "movement-image"
        }
        src={allMovementSrcList[0]}
        initial="visible"
        alt="first-movement"
      />
      <motion.img
        className="movement-image"
        src={allMovementSrcList[count]}
        initial="hidden"
        animate={controls}
        exit="hidden"
        variants={variants}
        key={count}
      />
    </>
  );
};

export default MovementImages;
