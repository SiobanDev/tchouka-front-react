import { jpNeutre } from "../../config/mediasConstants";

export const adaptComposition = (composition, setComposition) => {
  const compositionTmp = [...composition];

  for (let i = 0; i < compositionTmp.length; i++) {
    //Add neutral position between two same consecutive movements
    const movementListTmp = [...compositionTmp[i].movementList, jpNeutre];

    compositionTmp[i].movementList = movementListTmp;

    //Recount the duration for each image
    const wholeMovementDuration = compositionTmp[i].durationList.reduce(
      (a, b) => a + b
    );

    //We have just added the neutral position at the end of each movement and now we want the duration of this image is pretty short (see neutralPositionDuration) but the whole duration of the movement may not change et mostly the other images must share the same duration
    const imageDurationTmp = 250
    const numberOfImagesExceptNeutral = compositionTmp[i].movementList.length - 1
    const neutralPositionDuration = wholeMovementDuration - (imageDurationTmp * numberOfImagesExceptNeutral)

    const movementDurationTmp = [];

    for (let j = 0; j < numberOfImagesExceptNeutral; j++) {
      movementDurationTmp.push(imageDurationTmp);
    }
    movementDurationTmp.push(neutralPositionDuration);


    compositionTmp[i].durationList = movementDurationTmp;
  }

  // console.log(
  //   "compositionTpm after MODIFY" + JSON.stringify(compositionTmp, null, " ")
  // );
  setComposition(compositionTmp);
};
