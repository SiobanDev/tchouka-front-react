import React, { useContext } from "react";
//styles
import "./Timeline.style.scss";
import AnimationContext from "../../../context/AnimationContext";
import { timeCodeInterval } from "../../../config/mainConstants";
import { useState } from "react";

const TimeLine = ({ allImageDelayList }) => {
  const { playingAnimation, setPlayingAnimation, timeCode } = useContext(
    AnimationContext
  );
  const positionInterval = Math.floor(
    (timeCodeInterval * 100) / allImageDelayList[allImageDelayList.length - 1]
  );
  const [cursorStyle, setCursorStyle] = useState({
    left: "-15px",
  });
  const [movingCursor, setMovingCursor] = useState(false);
  // const [mousePositionX, setMousePositionX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const landmarkPositionList = allImageDelayList.map(
    (imageDelay, i, allImageDelayList) => {
      return Math.floor(
        (imageDelay * 100) / allImageDelayList[allImageDelayList.length - 1]
      );
    }
  );
  console.log("landmarkPositionList : " + JSON.stringify(landmarkPositionList));

  // const getInitialMousePositionX = (event) => {
  //   setMousePositionX(event.clientX);
  // };

  const followMousePosition = (event) => {
    console.log("mouse.clientX : " + event.clientX);

    const mousePositionX = JSON.parse(event.clientX);
    console.log("mousePositionX : " + mousePositionX);

    event.target.addEventListener("mousenove", (e) => {
      const newPosition = e.clientX - mousePositionX;

      console.log("newPosition : " + newPosition);

      if (newPosition < 0) {
        setCursorStyle({
          left: 0,
        });
      } else if (newPosition >= containerWidth) {
        setCursorStyle({
          left: containerWidth,
        });
      } else {
        setCursorStyle({
          left: newPosition,
        });
      }
    });
  };

  const playTimeline = () => {
    if (playingAnimation) {
      function frame() {
        if (timeCode >= allImageDelayList[allImageDelayList.length - 1]) {
          clearInterval(intervalId);
          setPlayingAnimation(false);
        } else {
          const previousPosition = cursorStyle.left;
          const newPosition = previousPosition + positionInterval;
          setCursorStyle({
            ...cursorStyle,
            left: `${newPosition}%`,
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
    <div id="chronology-container">
      <div
        id="timeline-chronology"
        ref={(ref) =>
          setContainerWidth(ref && ref.current ? ref.current.offsetWidth : 0)
        }
      ></div>
      <div
        id="timeline-cursor"
        style={cursorStyle}
        onMouseDown={(event) => {
          followMousePosition(event);
        }}
        onMouseUp={() => {}}
      ></div>
      {landmarkPositionList.map((landmarkPosition, i) => (
        <div
          id={`movement-landmark-${i}`}
          className="droptarget"
          style={{ left: `${landmarkPosition}%` }}
          key={i}
        >
          <div className="movement-landmark"></div>
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
