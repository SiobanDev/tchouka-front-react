import {
  soundList,
  movementList,
} from "../../config/mediasConstants";

export const createComposition = (
  name,
  clickNumber,
  setClickNumber,
  partition,
  setComposition
) => {
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

export const playSoundOfBodyPart = (name, partition, composition) => {
  if (partition.length !== composition.length) {
    const soundOfBodyPart = new Audio(soundList[name]);
    soundOfBodyPart.volume = 0.5;
    soundOfBodyPart.play();
  }
};
