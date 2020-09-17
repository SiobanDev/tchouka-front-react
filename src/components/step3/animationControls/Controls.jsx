import React, { useContext, useEffect } from "react";
//styles
import "./Controls.style.scss";
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
    setLastSoundCount,
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
        setLastSoundCount(-1);

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
    }
  }, [
    allImageDelayList,
    playingAnimation,
    repeat,
    setLastSoundCount,
    setPlayingAnimation,
    setTimeCode,
    timeCode,
  ]);

  return (
    <div id="step3-controls">
      <TimeLine allImageDelayList={allImageDelayList} />
      <div className="step3-commands-container">
        <div className="play-item">
          <i
            className="far fa-play-circle round-icon"
            onClick={() => {
              setPlayingAnimation(true);
            }}
          ></i>
        </div>
        <div className="play-item">
          <i
            className="fas fa-pause-circle round-icon"
            onClick={() => {
              setPlayingAnimation(false);
            }}
          ></i>
        </div>
        <div className="play-item">
          <i
            className="fas fa-stop-circle round-icon"
            onClick={() => {
              setPlayingAnimation(false);
              setTimeCode(0);
              setLastSoundCount(-1);
            }}
          ></i>
        </div>{" "}
        <form id="repeat-item">
          <input
            type="checkbox"
            id="repeat-option"
            name="repeat-option"
            checked={repeat}
            onChange={handleCheckboxChange}
          />
          <p>Répéter</p>
        </form>
      </div>
    </div>
  );
};

export default Controls;
