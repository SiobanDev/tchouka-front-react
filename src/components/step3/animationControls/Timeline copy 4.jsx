import React, { useContext, useCallback } from "react";
//styles
import "./Timeline.style.scss";
import AnimationContext from "../../../context/AnimationContext";
import {
  timeCodeInterval,
  halfCursorWidth,
} from "../../../config/mainConstants";
import { useState } from "react";
import { useEffect } from "react";
import CompositionContext from "../../../context/CompositionContext";
import {
  getWholeMovememntDurationList,
  getAllMovementDelayList,
} from "./Timeline.utils";

const TimeLine = ({ allImageDelayList }) => {
  const { composition } = useContext(CompositionContext);

  const { playingAnimation, setPlayingAnimation, timeCode } = useContext(
    AnimationContext
  );
  const [cursorRef, setCursorRef] = useState(null);

  const [cursorStyle, setCursorStyle] = useState({
    left: `-${halfCursorWidth}px`,
  });
  const [cursorContainerRef, setCursorContainerRef] = useState(null);
  const [movingCursor, setMovingCursor] = useState(false);
  const [mousePositionX, setMousePositionX] = useState(0);
  const wholeMovementDurationList = getWholeMovememntDurationList(composition);
  const wholeMovementDelayList = getAllMovementDelayList(
    wholeMovementDurationList
  );
  const numberOfSecondsInAnimation = Math.floor(
    allImageDelayList[allImageDelayList.length - 1] / 1000
  );
  const timeSecondElementList = [];
  const junctionPositionBtwCursorAndMvmtLandmarkList = [];

  for (let i = 0; i <= numberOfSecondsInAnimation; i++) {
    const pixelElementPosition =
      cursorContainerRef &&
      Math.floor(
        (i * 1000 * cursorContainerRef.clientWidth) /
          wholeMovementDelayList[wholeMovementDelayList.length - 1]
      ) - halfCursorWidth;
    junctionPositionBtwCursorAndMvmtLandmarkList.push(pixelElementPosition);

    const percentageElementPosition = Math.floor(
      (1000 * 100) / wholeMovementDelayList[wholeMovementDelayList.length - 1]
    );
    timeSecondElementList.push(
      <div
        className="time-second-landmark"
        key={`second-landmark-${i}`}
        style={{ left: `${i * percentageElementPosition}%` }}
      ></div>
    );
  }

  console.log(
    "junctionPositionBtwCursorAndMvmtLandmarkList : " +
      JSON.stringify(junctionPositionBtwCursorAndMvmtLandmarkList)
  );

  const landmarkPositionList = [];

  //The last item of the wholeMovementDelayList is the whole duration of the animation but does not correspond to any movement
  for (let i = 0; i < wholeMovementDelayList.length; i++) {
    landmarkPositionList.push(
      Math.floor(
        (wholeMovementDelayList[i] * 100) /
          wholeMovementDelayList[wholeMovementDelayList.length - 1]
      )
    );
  }

  const getInitialMousePositionX = (event) => {
    setMousePositionX(event.clientX);
  };

  const followMousePosition = (event) => {
    const newPosition = event.clientX - mousePositionX;

    if (newPosition < 0) {
      setCursorStyle({
        left: 0,
      });
    } else if (newPosition <= cursorContainerRef.clientWidth) {
      setCursorStyle({
        left: event.target.width,
      });
    } else {
      setCursorStyle({
        left: newPosition,
      });
    }
  };

  const playTimeline = useCallback(() => {
    if (timeCode >= allImageDelayList[allImageDelayList.length - 1]) {
      setPlayingAnimation(false);

      setCursorStyle({
        left: `-${halfCursorWidth}px`,
      });
    } else {
      const animationDuration = allImageDelayList[allImageDelayList.length - 1];

      // console.log("timeCode in Timeline : " + timeCode);

      setCursorStyle({
        transition: `left ${animationDuration}ms linear`,
        left: cursorContainerRef.clientWidth - 15,
      });
    }
  }, [allImageDelayList, cursorContainerRef, setPlayingAnimation, timeCode]);

  useEffect(() => {
    if (playingAnimation) {
      playTimeline();
    }
  }, [playTimeline, playingAnimation]);

  useEffect(() => {
    if (playingAnimation) {
      cursorRef.addEventListener("transitionstart", (event) => {
        console.log("cursor positiON : " + event.clientX);

        if (
          junctionPositionBtwCursorAndMvmtLandmarkList.includes(
            event.target.clientX
          )
        ) {
          console.log("yes");
        }
      });
    }
  }, [
    cursorRef,
    junctionPositionBtwCursorAndMvmtLandmarkList,
    playingAnimation,
  ]);

  return (
    <div
      id="chronology-container"
      ref={setCursorContainerRef}
      onMouseMove={movingCursor ? followMousePosition : () => {}}
    >
      <div
        id="timeline-cursor"
        style={cursorStyle}
        ref={setCursorRef}
        onClick={(event) => {
          setMovingCursor(movingCursor ? false : true);
          getInitialMousePositionX(event);
        }}
        onMouseUp={() => {}}
      ></div>
      <div id="timeline-chronology"></div>
      {timeSecondElementList}
      {landmarkPositionList.map((landmarkPosition, i) => (
        <div
          id={`movement-landmark-${i}`}
          className="movement-landmark"
          style={{ left: `${landmarkPosition}%` }}
          key={landmarkPosition}
        ></div>
      ))}
    </div>
  );
};

export default TimeLine;
