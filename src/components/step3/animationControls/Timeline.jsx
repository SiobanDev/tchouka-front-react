import React, { useContext } from "react";
//Styles
import "./Timeline.style.scss";
import scssVariables from "./Timeline.style.scss";
//Contexts
import AnimationContext from "../../../context/AnimationContext";
import CompositionContext from "../../../context/CompositionContext";
//Constants
import { timeCodeInterval } from "../../../config/mainConstants";
//Utils
import {
  getWholeMovememntDurationList,
  getAllMovementDelayList,
} from "./Timeline.utils";

const TimeLine = ({ allImageDelayList, cursorProgress }) => {
  const { composition } = useContext(CompositionContext);
  const { playingAnimation } = useContext(
    AnimationContext
  );
  const wholeMovementDurationList = getWholeMovememntDurationList(composition);
  const wholeMovementDelayList = getAllMovementDelayList(
    wholeMovementDurationList
  );
  const numberOfSecondsInAnimation = Math.floor(
    allImageDelayList[allImageDelayList.length - 1] / 1000
  );
  const timeSecondElementList = [];
  const cursorPosition = cursorProgress > 100 ? 100 : cursorProgress;
  const cursorStyle = {
    transition: playingAnimation
      ? `left ${timeCodeInterval}ms linear`
      : undefined,
    left: `calc(${cursorPosition}% - ${scssVariables.halfCursorWidth}px + ${scssVariables.halfLineWidth}px)`,
  };

  for (let i = 0; i <= numberOfSecondsInAnimation; i++) {
    const percentageElementPosition =
      (1000 * 100) / wholeMovementDelayList[wholeMovementDelayList.length - 1];

    timeSecondElementList.push(
      <div
        className="time-second-landmark"
        key={`second-landmark-${i}`}
        style={{ left: `${i * percentageElementPosition}%` }}
      ></div>
    );
  }

  const landmarkPositionList = [];

  //The last item of the wholeMovementDelayList is the whole duration of the animation but does not correspond to any movement
  for (let i = 0; i < wholeMovementDelayList.length; i++) {
    const landmarkPosition =
      (wholeMovementDelayList[i] * 100) /
      wholeMovementDelayList[wholeMovementDelayList.length - 1];
    landmarkPositionList.push(landmarkPosition);
  }

  return (
    <>
      <div id="timeline-cursor" style={cursorStyle}></div>
      {composition.map((movement, i) => {
        const imageSrcWithFocus = movement.movementList[0].replace(
          ".svg",
          "-rd.svg"
        );

        return (
          <img
            className="movement-image-thumbnail"
            src={imageSrcWithFocus}
            key={movement.id}
            style={{
              left: `calc(${landmarkPositionList[i]}% - ${scssVariables.halfThumbnailWidth}px + ${scssVariables.halfLineWidth}px)`,
            }}
            alt="movement-img-thumbnail"
          />
        );
      })}
      <div id="timeline-chronology"></div>
      {timeSecondElementList}
      {composition.map((movement, i) => (
        <p
          className="singingWord"
          key={movement.id}
          style={{
            left: `calc(${landmarkPositionList[i]}% - ${scssVariables.halfLandmarkWidth}px)`,
          }}
        >
          {movement.singingWord}
        </p>
      ))}
      {landmarkPositionList.map((landmarkPosition, i) => (
        <div
          id={`movement-landmark-${i}`}
          className="movement-landmark"
          style={{
            left: `calc(${landmarkPosition}% - ${scssVariables.halfLandmarkWidth}px + ${scssVariables.halfLineWidth}px)`,
          }}
          key={landmarkPosition}
        ></div>
      ))}
    </>
  );
};

export default TimeLine;
