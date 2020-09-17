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
    <div className="step3-command-container">
      <TimeLine allImageDelayList={allImageDelayList} />

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
            setTimeCode(0);
            setLastSoundCount(-1);
          }}
        ></i>
        <p>Arrêter l'animation</p>
      </div>
    </div>
  );
};

export default Controls;
