import React, { useContext } from "react";
//styles
import "./Timeline.style.scss";
import AnimationContext from "../../../context/AnimationContext";
import { timeCodeInterval } from "../../../config/mainConstants";
import CompositionContext from "../../../context/CompositionContext";
import {
  getWholeMovememntDurationList,
  getAllMovementDelayList,
} from "./Timeline.utils";
import scssVariables from "./Timeline.style.scss";

const TimeLine = ({ allImageDelayList, cursorProgress, chronologyStyle }) => {
  const { composition } = useContext(CompositionContext);
  const { playingAnimation, setPlayingAnimation, timeCode } = useContext(
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
  const cursorStyle = {
    transition: playingAnimation
      ? `left ${timeCodeInterval}ms linear`
      : undefined,
    left: `calc(${cursorProgress}% - ${scssVariables.halfCursorWidth}px + ${scssVariables.halfLineWidth}px)`,
  };
  // console.log("cursorProgress in Timeline : " + cursorProgress);

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

  // console.log("wholeMovementDelayList :" + JSON.stringify(wholeMovementDelayList))


  return (
    <div id="chronology-container-content" style={chronologyStyle}>
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
    </div>
  );
};

export default TimeLine;
