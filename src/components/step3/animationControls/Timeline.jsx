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

const TimeLine = ({ allImageDelayList }) => {
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
  const cursorStep = Math.floor(
    (timeCode / allImageDelayList[allImageDelayList.length - 1]) * 100
  );
  const cursorStyle = {
    transition: playingAnimation
      ? `left ${timeCodeInterval}ms linear`
      : undefined,
    left: `calc(${cursorStep}% - ${scssVariables.halfCursorWidth}px + ${scssVariables.halfLineWidth}px)`,
  };
  // console.log("cursorStep in Timeline : " + cursorStep);

  for (let i = 0; i <= numberOfSecondsInAnimation; i++) {
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

  // console.log("wholeMovementDelayList :" + JSON.stringify(wholeMovementDelayList))
  if (
    playingAnimation &&
    timeCode >= allImageDelayList[allImageDelayList.length - 1]
  ) {
    setPlayingAnimation(false);
  }

  return (
    <div id="chronology-container-content">
      {composition.map((movement, i) => {
        const imageSrcWithFocus = movement.movementList[0].replace(
          ".svg",
          "-rd.svg"
        );

        console.log("imageSrcWithFocus : " + imageSrcWithFocus);

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
      <div id="timeline-cursor" style={cursorStyle}></div>
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
