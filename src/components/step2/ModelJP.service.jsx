import React from "react";
//Constants
import { soundList, movementList } from "../../config/mediasConstants";

const createComposition = (
  bodyPartName,
  score,
  composition,
  setComposition
) => {
  if (composition.length < score.length) {
    localStorage.getItem("composition") &&
      localStorage.removeItem("composition");

    const newCompositionItem = {
      id: composition.length,
      durationList:
        movementList[bodyPartName].length === 1
          ? [score[composition.length].duration]
          : [
              score[composition.length].duration / 2,
              score[composition.length].duration / 2,
            ],
      movementList: movementList[bodyPartName],
      singingWord: bodyPartName,
      sound: soundList[bodyPartName],
    };

    setComposition((composition) => [...composition, newCompositionItem]);
  }
};

const playSoundOfBodyPart = (bodyPartName, score, composition) => {
  if (score.length !== composition.length) {
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
  score,
  composition
) => {
  if (score.length !== composition.length) {
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
  score,
  composition,
  setComposition,
  setMovementImageToDisplay
) => {
  createComposition(bodyPartName, score, composition, setComposition);
  playSoundOfBodyPart(bodyPartName, score, composition);
  playOneMovement(bodyPartName, setMovementImageToDisplay, score, composition);
};
