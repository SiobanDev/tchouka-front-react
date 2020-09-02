import React, { useCallback, useEffect, useContext } from "react";
//components
//data
//styles
import "./Step3.style.scss";
//libraries
import { motion, useAnimation } from "framer-motion";
import { compositionData } from "../../mocks/compositionData";
import AnimationContext from "../../context/AnimationContext";
import { useState } from "react";
import MovementImages from "./MovementImages";

export const JPAnimation = ({ repeat }) => {
  // const { composition } = useContext(CompositionContext);
  const { playingAnimation, setPlayingAnimation } = useContext(
    AnimationContext
  );
  const allMovementDurationList = [];
  const allMovementDelayList = [];
  const controls = useAnimation();
  const [timeCode, setTimeCode] = useState(0);
  const [count, setCount] = useState(0);

  compositionData.forEach((compositionItem) => {
    compositionItem.durationList.forEach((movementDuration) =>
      allMovementDurationList.push(movementDuration)
    );
  });

  const addSumOfDelay = (previousSum, nextDuration) => {
    allMovementDelayList.push(previousSum + nextDuration);
    return previousSum + nextDuration;
  };

  allMovementDurationList.reduce(addSumOfDelay, 0);

  const playSequence = useCallback(async () => {
    try {
      await controls.start("visible");
    } catch (e) {
      console.log("Error with Framer controls promise : " + e);
    }
  }, [controls]);

  const resetAnimation = useCallback(() => {
    setTimeout(() => {
      setPlayingAnimation(false);
    }, allMovementDelayList[allMovementDelayList.length - 1] * 1000);
  }, [allMovementDelayList, setPlayingAnimation]);

  useEffect(() => {
    if (playingAnimation) {
      playSequence();

      const timer =
        timeCode < allMovementDelayList[allMovementDelayList.length - 1] &&
        setInterval(() => setTimeCode(timeCode + 0.25), 250);

      console.log("timeCode  : " + timeCode);
      console.log("playAnimation in JP  : " + playingAnimation);

      setTimeout(() => {
        setPlayingAnimation(false);
      }, allMovementDelayList[allMovementDelayList.length - 1]);
      
      return () => {
        clearInterval(timer);
      };
      
    } else {
      controls.start("hidden");
    }
  }, [allMovementDelayList, controls, playSequence, playingAnimation, setPlayingAnimation, timeCode]);

  if (timeCode === allMovementDelayList[allMovementDelayList.length - 1]) {
    setPlayingAnimation(false);
  }

  if (timeCode < allMovementDelayList[count]) {
    //TO DO : constraint to toggle a class on first image to change opacity
    return (
      <MovementImages
        count={count}
        controls={controls}
        playingAnimation={playingAnimation}
      />
    );
  } else {
    setCount(count + 1);
    return (
      <MovementImages
        count={count}
        controls={controls}
        playingAnimation={playingAnimation}
      />
    );
  }
};

export default JPAnimation;
