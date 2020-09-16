export const getWholeMovememntDurationList = (composition) => {
  const allMovememntDurationList = [];

  composition.forEach((compositionItem) => {
    const wholeMovementDuration = compositionItem.durationList.reduce(
      (a, b) => a + b
    );
    allMovememntDurationList.push(wholeMovementDuration);
  });

  return allMovememntDurationList;
};

export const getAllMovementDelayList = (allMovementDurationList) => {
  const allMovementDelayList = [0];

  const addSumOfImageDelay = (previousSum, nextDuration) => {
    allMovementDelayList.push(previousSum + nextDuration);
    return previousSum + nextDuration;
  };

  allMovementDurationList.reduce(addSumOfImageDelay, 0);

  return allMovementDelayList;
};
