import React from "react";

const initialContextValues = {
  playingAnimation: false,
  setPlayingAnimation: () => {},
};

const AnimationContext = React.createContext(initialContextValues);

export default AnimationContext;
