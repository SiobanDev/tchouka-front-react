import { jpNeutre } from "../../config/mediasConstants";

export const adaptCompoIfTwoConsecutiveMovements = (composition, setComposition) => {
  const compositionTmp = [...composition];

  for (let i = 0; i < compositionTmp.length; i++) {
    if (
      i > 0 &&
      JSON.stringify(compositionTmp[i - 1].movementList) ===
        JSON.stringify(compositionTmp[i].movementList)
    ) {
      console.log("followingSameMovementList : " + i);

      //Add neutral position between two same consecutive movements
      const movementListTmp = [...compositionTmp[i - 1].movementList, jpNeutre];

      compositionTmp[i - 1].movementList = movementListTmp;

      //Recount the duration for each image
      const wholeMovementDuration = compositionTmp[i - 1].durationList.reduce(
        (a, b) => a + b
      );

      const imageDurationTmp = Math.floor(
        wholeMovementDuration / compositionTmp[i - 1].movementList.length
      );
      const movementDurationTmp = [];

      for (let j = 0; j < compositionTmp[i - 1].movementList.length; j++) {
        movementDurationTmp.push(imageDurationTmp);
      }

      compositionTmp[i - 1].durationList = movementDurationTmp;
    }
  }

  // console.log(
  //   "compositionTpm after MODIFY" + JSON.stringify(compositionTmp, null, " ")
  // );
  setComposition(compositionTmp);
};
