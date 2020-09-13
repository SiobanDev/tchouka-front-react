import { jpNeutre } from "../../config/mediasConstants";

export const addNeutralPosition = (composition, setComposition) => {
  const followingSameMovementList = composition.findIndex(
    (movement, i, compositionArray) => {
      if (i > 0 && i < composition.length) {
        return (
          JSON.stringify(compositionArray[i - 1].movementList) ===
          JSON.stringify(compositionArray[i].movementList)
        );
      }
    }
  );

  if (followingSameMovementList > 0) {
    console.log("followingSameMovementList : " + followingSameMovementList);
    const compositionTmp = composition;

    console.log("compositionTmp[followingSameMovementList - 1] : " + JSON.stringify(compositionTmp[followingSameMovementList - 1]));

    console.log("compositionTmp[followingSameMovementList - 1].movementList : " + JSON.stringify(compositionTmp[followingSameMovementList - 1].movementList));

    compositionTmp[followingSameMovementList - 1].movementList.push(jpNeutre);

    setComposition(compositionTmp);
  }
};

export const adaptImageDuration = (composition, setComposition) => {
  const followingSameMovementList = composition.findIndex(
    (movement, i, compositionArray) => {
      if (i > 0 && i < composition.length) {
        return (
          JSON.stringify(compositionArray[i - 1].movementList) ===
          JSON.stringify(compositionArray[i].movementList)
        );
      }
    }
  );

  //console.log("followingSameMovementList : " + followingSameMovementList);

  if (followingSameMovementList > 0) {
    const compositionTmp = composition;

    const wholeMovementDuration = compositionTmp[
      followingSameMovementList - 1
    ].durationList.reduce((a, b) => a + b);

    const imageDurationTmp = Math.floor(
      wholeMovementDuration /
        compositionTmp[followingSameMovementList - 1].movementList.length
    );
    const movementDurationTmp = [];

    for (
      let i = 0;
      i < compositionTmp[followingSameMovementList - 1].movementList.length;
      i++
    ) {
      movementDurationTmp.push(imageDurationTmp);
    }

    compositionTmp[
      followingSameMovementList - 1
    ].durationList = movementDurationTmp;

    setComposition(compositionTmp);
  }
};

export const adaptComposition = (composition, setComposition) => {
  addNeutralPosition(composition, setComposition);
  adaptImageDuration(composition, setComposition);

  console.log("COMPO AFTER MODIF : " + JSON.stringify(composition, null, " "));
};
