import React from "react";

const initialContextValues = {
  composition: [],
  setComposition: () => {},
  isLastItemRemoved: false,
  setIsLastItemRemoved: () => {},
};

const CompositionContext = React.createContext(initialContextValues);

export default CompositionContext;
