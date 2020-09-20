import React, { useContext, useEffect, useState } from "react";
//styles
import "./Controls.style.scss";
import AnimationContext from "../../../context/AnimationContext";
import { timeCodeInterval } from "../../../config/mainConstants";
import TimeLine from "./Timeline";
import scssVariables from "./Timeline.style.scss";

const Controls = ({ allImageDelayList }) => {
  const {
    playingAnimation,
    setPlayingAnimation,
    goBackBeginning,
    setGoBackBeginning,
    timeCode,
    setTimeCode,
    repeat,
    setRepeat,
    setLastSoundCount,
  } = useContext(AnimationContext);
  const handleCheckboxChange = () => {
    repeat ? setRepeat(false) : setRepeat(true);
  };
  const onClickMovingStep = 500;
  const [forwardingValue, setForwardingValue] = useState(0);
  const cursorProgress =
    (timeCode / allImageDelayList[allImageDelayList.length - 1]) * 100;
  const chronologyLeftStyleValue =
    (cursorProgress / 100) * scssVariables.chronologyContentWidth;
  // const timelineEndLeftStyle = playingAnimation ? 0
  const chronologyStyleLeft =
    chronologyLeftStyleValue + forwardingValue >
    scssVariables.chronologyContentWidth - onClickMovingStep
      ? (scssVariables.chronologyContentWidth - onClickMovingStep) * -1
      : (chronologyLeftStyleValue + forwardingValue) * -1;

  const chronologyStyle = {
    transition: `left 500ms ease-out`,
    left: `${chronologyStyleLeft}px`,
  };
  const maxShiftOfChronologyContent = scssVariables.chronologyContentWidth * -1;

  useEffect(() => {
    if (
      playingAnimation &&
      timeCode >= allImageDelayList[allImageDelayList.length - 1]
    ) {
      setPlayingAnimation(false);
    }

    if (goBackBeginning) {
      setPlayingAnimation(false);
      setTimeCode(0);
    }

    if (playingAnimation) {
      setGoBackBeginning(false);

      if (
        timeCode === allImageDelayList[allImageDelayList.length - 1] ||
        timeCode >= allImageDelayList[allImageDelayList.length - 1]
      ) {
        setPlayingAnimation(false);
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
    goBackBeginning,
    playingAnimation,
    repeat,
    setGoBackBeginning,
    setLastSoundCount,
    setPlayingAnimation,
    setTimeCode,
    timeCode,
  ]);

  return (
    <div id="step3-chronology">
      <div id="timeline-container">
        {!playingAnimation && chronologyStyleLeft < 0 ? (
          <div id="go-backward-container">
            <i
              className="far fa-arrow-circle-left round-icon"
              onClick={() => {
                setForwardingValue(forwardingValue - onClickMovingStep);
              }}
            ></i>
          </div>
        ) : null}
        {!playingAnimation ? (
          <div id="go-forward-container">
            <i
              className="far fa-arrow-circle-right round-icon"
              onClick={() => {
                if (
                  chronologyStyleLeft >
                  maxShiftOfChronologyContent + onClickMovingStep
                ) {
                  setForwardingValue(forwardingValue + onClickMovingStep);
                }
              }}
            ></i>
          </div>
        ) : null}
        <TimeLine
          allImageDelayList={allImageDelayList}
          cursorProgress={cursorProgress}
          chronologyStyle={chronologyStyle}
        />
      </div>

      <div className="step3-commands-container">
        <div className="play-item">
          <i
            className="far fa-step-backward round-icon"
            onClick={() => {
              setGoBackBeginning(true);
            }}
          ></i>
        </div>
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
