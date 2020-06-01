import React from "react";

const initialContextValues = {
  endedStep: 0
};

const StepContext = React.createContext(initialContextValues);

export default StepContext;
