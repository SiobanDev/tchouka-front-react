import { jpNeutre } from "../../config/mediasConstants";

export const getAllImageSrcList = (composition) => {
  const allImageSrcList = [];

  composition.forEach((compositionItem) => {
    compositionItem.movementList.forEach((noteMovementSrc) => {
      allImageSrcList.push(noteMovementSrc);
    });
  });

  return allImageSrcList;
};

export const getAllImageDurationList = (composition) => {
  const allImageDurationList = [];

  composition.forEach((compositionItem) => {
    compositionItem.durationList.forEach((movementDuration) =>
      allImageDurationList.push(movementDuration)
    );
  });

  return allImageDurationList;
};

export const getAllSoundDurationList = (composition) => {
  const allSoundDurationList = [];

  composition.forEach((compositionItem) => {
    var durationSum = compositionItem.durationList.reduce(function (a, b) {
      return a + b;
    }, 0);

    allSoundDurationList.push(durationSum);
  });

  return allSoundDurationList;
};

export const getAllImageDelayList = (allImageDurationList) => {
  const allImageDelayList = [0];

  const addSumOfImageDelay = (previousSum, nextDuration) => {
    allImageDelayList.push(previousSum + nextDuration);
    return previousSum + nextDuration;
  };

  allImageDurationList.reduce(addSumOfImageDelay, 0);

  return allImageDelayList;
};

export const getAllSoundDelayList = (allSoundDurationList) => {
  const allSoundDelayList = [0];

  const addSumOfSoundDelay = (previousSum, nextDuration) => {
    allSoundDelayList.push(previousSum + nextDuration);
    return previousSum + nextDuration;
  };

  allSoundDurationList.reduce(addSumOfSoundDelay, 0);

  return allSoundDelayList;
};

export const addBackgroundToImages = (allImageSrcList, imageCount) => {
  console.log("imageCount : " + imageCount);

  const movementImageSrc = allImageSrcList[imageCount]
    ? allImageSrcList[imageCount].substring(
        0,
        allImageSrcList[imageCount].length - 4
      ) + "-fd.svg"
    : allImageSrcList[0].substring(0, allImageSrcList[0].length - 4) +
      "-fd.svg";

  return movementImageSrc;
};

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

  console.log("followingSameMovementList : " + followingSameMovementList);

  if (followingSameMovementList > 0) {
    const compositionTmp = composition;

    compositionTmp[followingSameMovementList - 1].movementList.splice(
      compositionTmp[followingSameMovementList - 1].movementList.length,
      0,
      jpNeutre
    );

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

    const imageDurationTmp = Math.floor(
      compositionTmp[followingSameMovementList - 1].durationList /
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
