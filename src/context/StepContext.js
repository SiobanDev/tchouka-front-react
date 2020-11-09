import React from "react";

const initialContextValues = {
    currentStep: 0,
    setCurrentStep: () => {},
  };

const StepContext = React.createContext(initialContextValues);

export default StepContext;
