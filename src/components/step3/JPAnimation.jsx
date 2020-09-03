import React, { useEffect, useContext } from "react";
//components
//data
//styles
import "./Step3.style.scss";
//libraries
import { useAnimation } from "framer-motion";
import { compositionData } from "../../mocks/compositionData";
import AnimationContext from "../../context/AnimationContext";
import { useState } from "react";

export const JPAnimation = () => {
  // const { composition } = useContext(CompositionContext);
  const { playingAnimation, setPlayingAnimation } = useContext(
    AnimationContext
  );
  const allImageSrcList = [];
  const allImageDurationList = [];
  const allImageDelayList = [0];
  const allSoundDurationList = [];
  const allSoundDelayList = [0];
  const [timeCode, setTimeCode] = useState(0);

  //TODO: move arrays filling in a useCallback

  compositionData.forEach((compositionItem) => {
    compositionItem.durationList.forEach((movementDuration) =>
      allImageDurationList.push(movementDuration)
    );
    compositionItem.movementList.forEach((noteMovementSrc) => {
      allImageSrcList.push(noteMovementSrc);
    });

    var durationSum = compositionItem.durationList.reduce(function (a, b) {
      return a + b;
    }, 0);

    allSoundDurationList.push(durationSum);
  });

  // console.log("allSoundDurationList : " + JSON.stringify(allSoundDurationList));

  const addSumOfImageDelay = (previousSum, nextDuration) => {
    allImageDelayList.push(previousSum + nextDuration);
    return previousSum + nextDuration;
  };

  const addSumOfSoundDelay = (previousSum, nextDuration) => {
    allSoundDelayList.push(previousSum + nextDuration);
    return previousSum + nextDuration;
  };

  allImageDurationList.reduce(addSumOfImageDelay, 0);
  allSoundDurationList.reduce(addSumOfSoundDelay, 0);

  const imageCount = (() => {
    const imageCountTmp =
      allImageDelayList.findIndex((movementDelay) => movementDelay > timeCode) -
      1;

    return imageCountTmp >= 0 ? imageCountTmp : allImageDelayList.length - 1;
  })();

  const movementImageSrc = allImageSrcList[imageCount]
    ? allImageSrcList[imageCount].substring(
        0,
        allImageSrcList[imageCount].length - 4
      ) + "-fd.svg"
    : allImageSrcList[0];

  const soundCount = (() => {
    const soundCountTmp =
      allSoundDelayList.findIndex((movementDelay) => movementDelay > timeCode) -
      1;

    return soundCountTmp >= 0 ? soundCountTmp : compositionData.length - 1;
  })();

  console.log(
    "soundCount :" +
      soundCount +
      " //// allSoundDelayList :" +
      allSoundDelayList
  );
  // console.log("imageCount :" + imageCount);
  // console.log("allImageSrcList :" + allImageSrcList);
  // console.log("allImageDelayList :" + allImageDelayList);

  useEffect(() => {
    if (playingAnimation) {
      //TODO : replace "+ 0.25" with date.now() - date.depart (-> state updated when animation starts)
      if (timeCode === allImageDelayList[allImageDelayList.length - 1]) {
        setPlayingAnimation(false);
        setTimeCode(0);
      } else {
        const start = Date.now() / 1000;
        const timer =
          timeCode < allImageDelayList[allImageDelayList.length - 1] &&
          setInterval(
            () => setTimeCode(timeCode + Date.now() / 1000 - start),
            250
          );

        console.log("timeCode  : " + timeCode);
        console.log("playAnimation in JP  : " + playingAnimation);

        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [allImageDelayList, playingAnimation, setPlayingAnimation, timeCode]);

  useEffect(() => {
    if (playingAnimation) {
      const movementSound = new Audio();
      movementSound.src = compositionData[soundCount].sound;
      movementSound.play();
    }
  }, [playingAnimation, soundCount]);

  //TO DO : constraint to toggle a class on first image to change opacity
  return (
    <>
      <img
        className="movement-image"
        src={movementImageSrc}
        alt="movement-img"
      />
    </>
  );
};

export default JPAnimation;
