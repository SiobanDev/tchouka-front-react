import React, { useEffect, useContext } from "react";
//Styles
import "./Step3.style.scss";
//Contexts
import AnimationContext from "../../context/AnimationContext";
import CompositionContext from "../../context/CompositionContext";
//Utils
import {
  getAllImageSrcList,
  getAllSoundDurationList,
  getAllSoundDelayList,
  addBackgroundToImages,
} from "./Step3.utils";
//Constants
import { jpNeutre } from "../../config/mediasConstants";

export const JPAnimation = ({ allImageDelayList }) => {
  const { composition, setComposition } = useContext(CompositionContext);
  const {
    playingAnimation,
    timeCode,
    lastSoundCount,
    setLastSoundCount,
  } = useContext(AnimationContext);
  const allImageSrcList = getAllImageSrcList(composition);
  const allSoundDurationList = getAllSoundDurationList(composition);
  const allSoundDelayList = getAllSoundDelayList(allSoundDurationList);

  useEffect(() => {
    if (composition.length === 0 && localStorage.getItem("composition")) {
      setComposition(JSON.parse(localStorage.getItem("composition")));
    }
  }, [composition.length, setComposition]);

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
    if (playingAnimation && soundCount !== lastSoundCount) {
      const movementSound = new Audio();
      movementSound.src = composition[soundCount].sound;
      movementSound.play();

      setLastSoundCount(soundCount);
    }
  }, [
    composition,
    lastSoundCount,
    playingAnimation,
    setLastSoundCount,
    soundCount,
  ]);

  if (playingAnimation) {
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
