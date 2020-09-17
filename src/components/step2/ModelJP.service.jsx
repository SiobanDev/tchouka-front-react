import React from "react";

import {
  soundList,
  movementList,
} from "../../config/mediasConstants";

const createComposition = (
  bodyPartName,
  clickNumber,
  setClickNumber,
  partition,
  setComposition
) => {
  // console.log("clickNumber in create: " + clickNumber);

  if (partition.length > 0 && clickNumber < partition.length) {
    setClickNumber(clickNumber + 1);

    const newCompositionItem = {
      id: clickNumber,
      durationList:
        movementList[bodyPartName].length === 1
          ? [partition[clickNumber].duration]
          : [
              partition[clickNumber].duration / 2,
              partition[clickNumber].duration / 2,
            ],
      movementList: movementList[bodyPartName],
      singingWord: bodyPartName,
      sound: soundList[bodyPartName],
    };

    setComposition((composition) => [...composition, newCompositionItem]);
  }
};

const playSoundOfBodyPart = (bodyPartName, partition, composition) => {
  if (partition.length !== composition.length) {
    const soundOfBodyPart = new Audio(soundList[bodyPartName]);
    if (soundOfBodyPart) {
      soundOfBodyPart.volume = 0.5;
      soundOfBodyPart.addEventListener("canplaythrough", () => {
        /* the audio is now playable; play it if permissions allow */
        soundOfBodyPart.play();
      });
    }
  }
};

const playOneMovement = (
  bodyPartName,
  setMovementImageToDisplay,
  partition,
  composition
) => {
  if (partition.length !== composition.length) {
    let imageDelay = 0;
    clearTimeout(imageDelay);

    setMovementImageToDisplay([
      <img
        className="model animated-model"
        src={movementList[bodyPartName][0]}
        alt="movement"
        key={bodyPartName}
      />,
    ]);

    if (movementList[bodyPartName].length > 1) {
      imageDelay = setTimeout(setMovementImageToDisplay, 200, [
        <img
          className="model animated-model"
          src={movementList[bodyPartName][1]}
          alt="movement"
          key={bodyPartName}
        />,
      ]);
    } else {
      imageDelay = setTimeout(setMovementImageToDisplay, 400, []);
    }
  }
};

export const handleClickOnBodyPart = (
  bodyPartName,
  clickNumber,
  setClickNumber,
  partition,
  composition,
  setComposition,
  setMovementImageToDisplay
) => {
  createComposition(
    bodyPartName,
    clickNumber,
    setClickNumber,
    partition,
    setComposition
  );
  playSoundOfBodyPart(bodyPartName, partition, composition);
  playOneMovement(
    bodyPartName,
    setMovementImageToDisplay,
    partition,
    composition
  );
};
