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
  const { playingAnimation, setPlayingAnimation } = useContext(
    AnimationContext
  );

  const allMovementSrcList = [];
  const allMovementDurationList = [];
  const allMovementDelayList = [0];
  const controls = useAnimation();
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: (i) => {
      if (i < compositionData.length) {
        console.log("sound src : " + compositionData[i].sound);

        const soundOfBodyPart = new Audio(compositionData[i].sound);
        if (soundOfBodyPart) {
          soundOfBodyPart.volume = 0.5;
          soundOfBodyPart.addEventListener("canplaythrough", (event) => {
            /* the audio is now playable; play it if permissions allow */
            soundOfBodyPart.play();
          });
        }
      }

      return {
        opacity: 1,
        transition: {
          // repeat: repeat ? Infinity : 0,
          // duration: allMovementDurationList[i],
          delay: allMovementDelayList[i],
          ease: "easeOut",
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

  // console.log(
  //   "allMovementDurationList : " +
  //     allMovementDurationList +
  //     " allMovementDelayList :" +
  //     allMovementDelayList
  // );

  const sequence = useCallback(async () => {
    try {
      await controls.start("visible");

      const returnToInitialAnimationState = setTimeout(() => {
        if (repeat) {
          controls.start("hidden");
          setPlayingAnimation(true);
        } else {
          setPlayingAnimation(false);
        }
      }, allMovementDelayList[allMovementDelayList.length - 1]);

      return () => clearTimeout(returnToInitialAnimationState);
    } catch (e) {
      console.log("Error with Framer controls promise : " + e);
    }
  }, [allMovementDelayList, controls, repeat, setPlayingAnimation]);

  useEffect(() => {
    console.log(
      "in JP. repeat : " + repeat + " and playAnimation :" + playingAnimation
    );

    if (playingAnimation) {
      sequence();
    } else {
      controls.start("hidden");
    }
  }, [
    allMovementDelayList,
    controls,
    playingAnimation,
    repeat,
    sequence,
    setPlayingAnimation,
  ]);

  if (allMovementSrcList) {
    //TO DO : constraint to toggle a class on first image to change opacity
    return (
      <>
        <img
          id="first-movement-image"
          className={
            playingAnimation ? "movement-image hidden" : "movement-image"
          }
          src={
            allMovementSrcList[0].substring(
              0,
              allMovementSrcList[0].length - 4
            ) + "-fd.svg"
          }
          alt="first-movement"
        />
        {allMovementSrcList.map((movementSrc, i) => {
          return (
            <motion.img
              className="movement-image"
              src={movementSrc.substring(0, movementSrc.length - 4) + "-fd.svg"}
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
