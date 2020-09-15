import React, { useContext, useEffect } from "react";
//styles
import "./Timeline.style.scss";
import AnimationContext from "../../../context/AnimationContext";
import { timeCodeInterval } from "../../../config/mainConstants";
import TimeLine from "./Timeline";

const Controls = ({ allImageDelayList }) => {
  const {
    playingAnimation,
    setPlayingAnimation,
    timeCode,
    setTimeCode,
    repeat,
    setRepeat,
    resetTimeCode,
    setResetTimeCode,
  } = useContext(AnimationContext);
  const handleCheckboxChange = () => {
    repeat ? setRepeat(false) : setRepeat(true);
  };

  useEffect(() => {
    if (playingAnimation) {
      if (
        timeCode === allImageDelayList[allImageDelayList.length - 1] ||
        timeCode >= allImageDelayList[allImageDelayList.length - 1]
      ) {
        setPlayingAnimation(false);
        setTimeCode(0);

        if (repeat) {
          setPlayingAnimation(true);
        }
      } else {
        const start = Date.now();
        const timer =
          timeCode < allImageDelayList[allImageDelayList.length - 1] &&
          setInterval(
            () => setTimeCode(timeCode + Date.now() - start),
            timeCodeInterval
          );

        return () => {
          clearInterval(timer);
        };
      }
    } else {
      if (resetTimeCode) {
        setTimeCode(0);
      }
    }
  }, [
    allImageDelayList,
    playingAnimation,
    repeat,
    resetTimeCode,
    setPlayingAnimation,
    setTimeCode,
    timeCode,
  ]);

  return (
    <>
      <div className="step3-command-container">
        <form className="repeat-item">
          <input
            type="checkbox"
            id="repeat-option"
            name="repeat-option"
            checked={repeat}
            onChange={handleCheckboxChange}
          />
          <p>Répéter</p>
        </form>
        <div className="play-item">
          <i
            className="far fa-play-circle round-icon"
            onClick={() => {
              setPlayingAnimation(true);
            }}
          ></i>
          <p>Lancer l'animation</p>
        </div>
        <div className="play-item">
          <i
            className="fas fa-pause-circle round-icon"
            onClick={() => {
              setPlayingAnimation(false);
            }}
          ></i>
          <p>Mettre en pause l'animation</p>
        </div>
        <div className="play-item">
          <i
            className="fas fa-stop-circle round-icon"
            onClick={() => {
              setPlayingAnimation(false);
              setResetTimeCode(true);
            }}
          ></i>
          <p>Arrêter l'animation</p>
        </div>

        <TimeLine wholeAnimationDuration={allImageDelayList[allImageDelayList.length - 1]}/>
      </div>
    </>
  );
};

export default Controls;
