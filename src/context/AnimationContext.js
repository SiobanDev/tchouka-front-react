import React from "react";

const initialContextValues = {
  playingAnimation: false,
  setPlayingAnimation: () => {},
  timeCode: 0,
  setTimeCode: () => {},
  repeat: false,
  setRepeat: () => {},
  lastSoundCount: -1,
  setLastSoundCount: () => {},
};

const AnimationContext = React.createContext(initialContextValues);

export default AnimationContext;
