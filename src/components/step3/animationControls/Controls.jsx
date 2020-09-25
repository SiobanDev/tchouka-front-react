import React, { useContext, useEffect, useState } from "react";
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
  const onClickMovingStep = 500;
  const [forwardingValue, setForwardingValue] = useState(0);
  const [timelineRef, setTimelineRef] = useState(null);
  const cursorProgress =
    (timeCode / allImageDelayList[allImageDelayList.length - 1]) * 100;

  const timelineStyleWidthValue =
    (timelineRef && timelineRef.clientWidth) || 10000;
  const maxShiftOfChronologyContent =
    timelineStyleWidthValue - onClickMovingStep;

  const movingTimelinePosition =
    (cursorProgress / 100) * timelineStyleWidthValue;

  const timelineStyleLeft = playingAnimation
    ? Math.min(movingTimelinePosition, maxShiftOfChronologyContent)
    : forwardingValue;

  // console.log(
  //   `forworadingValue: ${forwardingValue} ` +
  //     "movingTimelinePosition : " +
  //     movingTimelinePosition
  // );

  const timelineStyle = {
    transition: `left 500ms ease-out`,
    left: `${-timelineStyleLeft}px`,
    width: `calc(15% * ${
      allImageDelayList[allImageDelayList.length - 1] / onClickMovingStep
    })`,
  };

  const setClampedForwardingValue = (value) => {
    // console.log(
    //   `forworadingValue: ${forwardingValue} new Value: ${value}, maxShift: ${maxShiftOfChronologyContent}`
    // );
    setForwardingValue(
      Math.max(0, Math.min(maxShiftOfChronologyContent, value))
    );
  };

  const resetAnimation = () => {
    setForwardingValue(0);
    setPlayingAnimation(false);
    setTimeCode(0);
    setLastSoundCount(-1);
  };

  const stopAnimation = () => {
    setForwardingValue(timelineStyleLeft);
    setPlayingAnimation(false);
    setTimeCode(allImageDelayList[allImageDelayList.length - 1]);
    setLastSoundCount(-1);
  };

  useEffect(() => {
    if (
      playingAnimation &&
      timeCode >= allImageDelayList[allImageDelayList.length - 1]
    ) {
      setForwardingValue(timelineStyleLeft);
      setPlayingAnimation(false);
    }

    if (playingAnimation) {
      if (
        timeCode === allImageDelayList[allImageDelayList.length - 1] ||
        timeCode >= allImageDelayList[allImageDelayList.length - 1]
      ) {
        setPlayingAnimation(false);
        setLastSoundCount(-1);

        if (repeat) {
          setTimeCode(0);
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
    timelineStyleLeft,
  ]);

  return (
    <div id="step3-chronology">
      <div id="chronology-container">
        {!playingAnimation && timelineStyleLeft > 0 ? (
          <div id="go-backward-container">
            <i
              className="far fa-arrow-circle-left round-icon"
              onClick={() => {
                setClampedForwardingValue(
                  timelineStyleLeft - onClickMovingStep
                );
              }}
            ></i>
          </div>
        ) : null}
        {!playingAnimation &&
        timelineStyleLeft < maxShiftOfChronologyContent ? (
          <div id="go-forward-container">
            <i
              className="far fa-arrow-circle-right round-icon"
              onClick={() => {
                setClampedForwardingValue(
                  timelineStyleLeft + onClickMovingStep
                );
              }}
            ></i>
          </div>
        ) : null}

        <div id="timeline-container" ref={setTimelineRef} style={timelineStyle}>
          <TimeLine
            allImageDelayList={allImageDelayList}
            cursorProgress={cursorProgress}
          />
        </div>
      </div>

      <div className="step3-commands-container">
        <div className="play-item">
          <i
            className="far fa-step-backward round-icon"
            onClick={resetAnimation}
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
              setForwardingValue(timelineStyleLeft);
              setPlayingAnimation(false);
            }}
          ></i>
        </div>
        <div className="play-item">
          <i
            className="fas fa-stop-circle round-icon"
            onClick={stopAnimation}
          ></i>
        </div>
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
