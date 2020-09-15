import React from "react";

const initialContextValues = {
  playingAnimation: false,
  setPlayingAnimation: () => {},
  timeCode: 0,
  setTimeCode: () => {},
  resetTimeCode: false,
  setResetTimeCode: () => {},
  repeat: false,
  setRepeat: () => {},
};

const AnimationContext = React.createContext(initialContextValues);

export default AnimationContext;
