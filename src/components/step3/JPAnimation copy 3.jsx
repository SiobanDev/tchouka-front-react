import React, { useCallback, useEffect, useContext } from "react";
//components
//data
//styles
import "./Step3.style.scss";
//libraries
import { motion, useAnimation } from "framer-motion";
import { compositionData } from "../../mocks/compositionData";
import AnimationContext from "../../context/AnimationContext";

export const JPAnimation = ({ repeat }) => {
  // const { composition } = useContext(CompositionContext);
  const { playingAnimation, setPlayingAnimation } = useContext(AnimationContext);

  const allMovementSrcList = [];
  const allMovementDurationList = [];
  const allMovementDelayList = [0];
  const controls = useAnimation();
  const variants = {
    hidden: {
      opacity: 0,
    },
    playing: (i) => {
      return {
        opacity: [1, 0],
        transition: {
          loop: repeat ? Infinity : 0,
          delay: [allMovementDelayList[i], allMovementDurationList[i]],
        },
      };
    },
  };

  const fillDurationAndSrcArrays = () => {
    compositionData.forEach((compositionItem) => {
      compositionItem.durationList.forEach((movementDuration) =>
        allMovementDurationList.push(movementDuration)
      );
      compositionItem.movementList.forEach((noteMovementSrc) =>
        allMovementSrcList.push(noteMovementSrc)
      );
    });
  };

  fillDurationAndSrcArrays();

  const addSumOfDelay = (previousSum, nextDuration) => {
    allMovementDelayList.push(previousSum + nextDuration);
    return previousSum + nextDuration;
  };

  allMovementDurationList.reduce(addSumOfDelay, 0);

  console.log(
    "allMovementDurationList : " + allMovementDurationList + " allMovementDelayList :" + allMovementDelayList
  );

  const sequence = useCallback(async () => {
    try {
      await controls.start("playing");

      setTimeout(() => {
        setPlayingAnimation(false);
      }, allMovementDelayList[allMovementDelayList.length - 1]);
      // clearTimeout(returnToInitialAnimationState);
    } catch (e) {
      console.log("Error with Framer controls promise : " + e);
    }
  }, [allMovementDelayList, controls, setPlayingAnimation]);

  useEffect(() => {
    // console.log(
    //   "in JP. repeat : " + repeat + " and playAnimation :" + playingAnimation
    // );

    if (playingAnimation) {
      sequence();
    } else {
      controls.start("hidden");
    }
  }, [
    allMovementDelayList,
    controls,
    repeat,
    sequence,
    setPlayingAnimation,
    playingAnimation,
  ]);

  if (allMovementSrcList) {
    //TO DO : constraint to toggle a class on first image to change opacity
    return (
      <>
        <img
          id="first-movement-image"
          className="movement-image"
          src={allMovementSrcList[0]}
          alt="first-movement"
        />
        {allMovementSrcList.map((movementSrc, i) => {
          return (
            <motion.img
              className="movement-image"
              src={movementSrc}
              initial="hidden"
              animate={controls}
              variants={variants}
              key={i}
              custom={i}
            />
          );
        })}
      </>
    );
  }
};

export default JPAnimation;
