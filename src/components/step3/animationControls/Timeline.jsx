import React, { useContext } from "react";
//styles
import "./Timeline.style.scss";
import AnimationContext from "../../../context/AnimationContext";
import { timeCodeInterval } from "../../../config/mainConstants";
import { useState } from "react";

const TimeLine = ({ wholeAnimationDuration }) => {
  const { playingAnimation, setPlayingAnimation, timeCode } = useContext(
    AnimationContext
  );
  const positionInterval = (timeCodeInterval * 100) / wholeAnimationDuration;
  const [cursorStyle, setCursorStyle] = useState({
    left: 0,
  });
  const [movingCursor, setMovingCursor] = useState(false);

  const [mousePositionX, setMousePositionX] = useState(0);

  const getInitialMousePositionX = (event) => {
    setMousePositionX(event.clientX);
  };

  const followMousePosition = (event) => {
    console.log("mouse.clientX : " + event.clientX);
    console.log("mousePositionX : " + mousePositionX);

    const newPosition = event.clientX - mousePositionX;

    setCursorStyle({
      ...cursorStyle,
      left: newPosition,
    });
  };

  const playTimeline = () => {
    if (playingAnimation) {
      function frame() {
        if (timeCode >= wholeAnimationDuration) {
          clearInterval(intervalId);
          setPlayingAnimation(false);
        } else {
          const previousPosition = cursorStyle.left;
          setCursorStyle({
            ...cursorStyle,
            left: previousPosition + positionInterval,
          });
        }
      }

      let intervalId = setInterval(frame, 10);
    }
  };

  if (playingAnimation) {
    playTimeline();
  }

  return (
    <div
      id="chronology-container"
      onMouseMove={movingCursor ? followMousePosition : () => {}}
    >
      <div id="timeline-chronology">
        <div
          id="timeline-cursor"
          style={cursorStyle}
          onClick={(event) => {
            setMovingCursor(true);
            getInitialMousePositionX(event);
          }}
        ></div>
      </div>
    </div>
  );
};

export default TimeLine;
