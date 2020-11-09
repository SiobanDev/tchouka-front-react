import React, { useContext, useEffect, useState } from "react";
//Styles
import "./Controls.style.scss";
//Contexts
import AnimationContext from "../../../context/AnimationContext";
//Constants
import { timeCodeInterval } from "../../../config/mainConstants";
//Components
import TimeLine from "./Timeline";
//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faStepBackward,
  faPlayCircle,
  faPauseCircle,
  faStopCircle,
} from "@fortawesome/free-solid-svg-icons";

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

  const timelineStyle = {
    transition: `left 500ms ease-out`,
    left: `${-timelineStyleLeft}px`,
    width: `calc(15% * ${
      allImageDelayList[allImageDelayList.length - 1] / onClickMovingStep
    })`,
  };

  const setClampedForwardingValue = (value) => {
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
            <FontAwesomeIcon
              className="round-icon"
              icon={faArrowCircleLeft}
              onClick={() => {
                setClampedForwardingValue(
                  timelineStyleLeft - onClickMovingStep
                );
              }}
            />
          </div>
        ) : null}
        {!playingAnimation &&
        timelineStyleLeft < maxShiftOfChronologyContent ? (
          <div id="go-forward-container">
            <FontAwesomeIcon
              className="round-icon"
              icon={faArrowCircleRight}
              onClick={() => {
                setClampedForwardingValue(
                  timelineStyleLeft + onClickMovingStep
                );
              }}
            />
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
          <FontAwesomeIcon
            className="round-icon"
            icon={faStepBackward}
            onClick={resetAnimation}
          />
        </div>
        <div className="play-item">
          <FontAwesomeIcon
            className="round-icon"
            icon={faPlayCircle}
            onClick={() => {
              setPlayingAnimation(true);
            }}
          />
        </div>
        <div className="play-item">
          <FontAwesomeIcon
            className="round-icon"
            icon={faPauseCircle}
            onClick={() => {
              setForwardingValue(timelineStyleLeft);
              setPlayingAnimation(false);
            }}
          />
        </div>
        <div className="play-item">
          <FontAwesomeIcon
            className="round-icon"
            icon={faStopCircle}
            onClick={stopAnimation}
          />
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
