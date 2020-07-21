import React from "react";

const initialContextValues = {
  composition: [],
  setComposition: () => {},
};

const CompositionContext = React.createContext(initialContextValues);

export default CompositionContext;
