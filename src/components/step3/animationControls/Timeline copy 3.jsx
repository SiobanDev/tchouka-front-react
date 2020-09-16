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

const TimeLine = ({ allImageDelayList }) => {
  const { playingAnimation, setPlayingAnimation, timeCode } = useContext(
    AnimationContext
  );
  const positionInterval = Math.floor(
    (timeCodeInterval * 100) / allImageDelayList[allImageDelayList.length - 1]
  );
  const [cursorStyle, setCursorStyle] = useState({
    left: `-${halfCursorWidth}px`,
  });
  const [cursorRef, setCursorRef] = useState(null);
  const [cursorContainerRef, setCursorContainerRef] = useState(null);

  const [movingCursor, setMovingCursor] = useState(false);
  const [mousePositionX, setMousePositionX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [timeSecondElementList, setTimeSecondElementList] = useState([]);
  const [timeSecondPositionList, setTimeSecondPositionList] = useState([]);

  const [timeSecondsCount, setTimeSecondsCount] = useState(0);
  const numberOfSecondsInAnimation = Math.floor(
    allImageDelayList[allImageDelayList.length - 1] / 1000
  );

  // const [timeSecondElementList, setTimeSecondElementList] = useState([]);

  // useEffect(()=>{ for (let i = 0; i < numberOfSecondsInAnimation; i++) {
  //   setTimeSecondElementList([...timeSecondElementList, <div
  //       className="time-second-landmark"
  //       key={`second-landmark-${i}`}
  //       style={{ left: 0 }}
  //     ></div>])
  // }},[numberOfSecondsInAnimation, timeSecondElementList])



  for (let i = 0; i < numberOfSecondsInAnimation; i++) {
    const secondLandmarkPosition = Math.floor(
      (i * 1000) / allImageDelayList[allImageDelayList.length - 1]
    );

    setTimeSecondElementList([
      ...timeSecondElementList,
      <div
        className="time-second-landmark"
        key={`second-landmark-${secondLandmarkPosition}`}
        style={{ left: secondLandmarkPosition }}
      ></div>,
    ]);
  }

  const landmarkPositionList = allImageDelayList.map(
    (imageDelay, i, allImageDelayList) => {
      return Math.floor(
        (imageDelay * 100) / allImageDelayList[allImageDelayList.length - 1]
      );
    }
    // console.log("landmarkPositionList : " + JSON.stringify(landmarkPositionList));
  );
  const getInitialMousePositionX = (event) => {
    console.log("event.clientX in getInitial :" + event.clientX);
    setMousePositionX(event.clientX);
  };

  const followMousePosition = (event) => {
    console.log("mouse.clientX : " + event.clientX);
    console.log("mousePositionX : " + mousePositionX);

    const newPosition = event.clientX - mousePositionX;

    console.log("newPosition : " + newPosition);

    if (newPosition < 0) {
      setCursorStyle({
        left: 0,
      });
    } else if (newPosition <= containerWidth) {
      setCursorStyle({
        left: event.target.width,
      });
    } else {
      setCursorStyle({
        left: newPosition,
      });
    }
  };

  useEffect(() => {}, []);

  const playTimeline = useCallback(() => {
    if (timeCode >= allImageDelayList[allImageDelayList.length - 1]) {
      setPlayingAnimation(false);

      setCursorStyle({
        left: 0,
      });
    } else {
      const animationDuration = allImageDelayList[allImageDelayList.length - 1];

      console.log("timeCode in Timeline : " + timeCode);

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

  return (
    <div
      id="chronology-container"
      ref={setCursorContainerRef}
      onMouseMove={movingCursor ? followMousePosition : () => {}}
    >
      <div
        id="timeline-cursor"
        ref={setCursorRef}
        style={cursorStyle}
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
          className="movement-landmark-container"
          style={{ left: `${landmarkPosition}%` }}
          key={landmarkPosition}
        >
          <div className="movement-landmark"></div>
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
