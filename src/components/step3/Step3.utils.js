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
  const movementImageSrc = allImageSrcList[imageCount]
    ? allImageSrcList[imageCount].replace(".svg", "-fd.svg")
    : allImageSrcList[0].replace(".svg", "-fd.svg") + "-fd.svg";

  return movementImageSrc;
};
