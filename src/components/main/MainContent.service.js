import {
  step1Url,
  step2Url,
  step3Url,
  homeUrl,
} from "../../config/urlConstants";

export const updateCurrentStepDependingOnUrl = (setCurrentStep) => {
  // console.log("window.location.pathname : " + window.location.pathname);
  // console.log("step1Url : " + step1Url);

  switch (window.location.pathname) {
    case homeUrl:
      setCurrentStep(0);
      break;
    case step1Url:
      setCurrentStep(1);
      break;
    case step2Url:
      setCurrentStep(2);
      break;
    case step3Url:
      setCurrentStep(3);
      break;
    default:
      setCurrentStep(0);
      break;
  }
};
