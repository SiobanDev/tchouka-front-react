import React, { useEffect, useContext } from "react";
//components
//data
//styles
import "./Step3.style.scss";
//libraries
import AnimationContext from "../../context/AnimationContext";
import { useState } from "react";
import {
  getAllImageSrcList,
  getAllImageDurationList,
  getAllSoundDurationList,
  getAllImageDelayList,
  getAllSoundDelayList,
  addBackgroundToImages,
} from "./Step3.utils";
import CompositionContext from "../../context/CompositionContext";
import { jpNeutre } from "../../config/mediasConstants";

export const JPAnimation = ({repeat}) => {
  const { composition, setComposition } = useContext(CompositionContext);
  const { playingAnimation, setPlayingAnimation } = useContext(
    AnimationContext
  );
  const allImageSrcList = getAllImageSrcList(composition);
  const allImageDurationList = getAllImageDurationList(composition);
  const allImageDelayList = getAllImageDelayList(allImageDurationList);
  const allSoundDurationList = getAllSoundDurationList(composition);
  const allSoundDelayList = getAllSoundDelayList(allSoundDurationList);
  const [timeCode, setTimeCode] = useState(0);

  useEffect(() => {
    if (composition.length === 0 && localStorage.getItem("composition")) {
      setComposition(JSON.parse(localStorage.getItem("composition")));
    }

    // console.log("composition dans JPAnimation " + JSON.stringify(composition));
  }, [composition, setComposition]);

  const soundCount = (() => {
    const soundCountTmp =
      allSoundDelayList.findIndex((movementDelay) => movementDelay > timeCode) -
      1;

    return soundCountTmp >= 0 && soundCountTmp < allSoundDelayList.length - 2
      ? soundCountTmp
      : composition.length - 1;
  })();

  const imageCount = (() => {
    const imageCountTmp =
      allImageDelayList.findIndex((movementDelay) => movementDelay > timeCode) -
      1;

    return imageCountTmp >= 0 ? imageCountTmp : allImageDelayList.length - 1;
  })();

  const movementImageSrc =
    allImageSrcList.length > 0
      ? addBackgroundToImages(allImageSrcList, imageCount)
      : [];

  useEffect(() => {
    if (playingAnimation) {
      if (
        timeCode === allImageDelayList[allImageDelayList.length - 1] ||
        timeCode >= allImageDelayList[allImageDelayList.length - 1]
      ) {
        setPlayingAnimation(false);
        setTimeCode(0);

        if(repeat){
          setPlayingAnimation(true);
        }
      } else {
        const start = Date.now();
        const timer =
          timeCode < allImageDelayList[allImageDelayList.length - 1] &&
          setInterval(() => setTimeCode(timeCode + Date.now() - start), 250);

        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [allImageDelayList, playingAnimation, setPlayingAnimation, timeCode]);

  useEffect(() => {
    if (playingAnimation) {
      const movementSound = new Audio();
      movementSound.src = composition[soundCount].sound;
      movementSound.play();
    }
  }, [composition, playingAnimation, soundCount]);

  if (movementImageSrc.length > 0) {
    return (
      <img
        className="movement-image"
        src={movementImageSrc}
        alt="movement-img"
      />
    );
  }
  return <img className="movement-image" src={jpNeutre} alt="movement-img" />;
};

export default JPAnimation;
