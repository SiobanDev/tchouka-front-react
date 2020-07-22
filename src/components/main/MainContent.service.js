import {
  step1Url,
  step2Url,
  step3Url,
  homeUrl,
} from "../../config/urlConstants";

export const updateCurrentStep = (setStepContext) => {
  console.log("window.location.pathname : " + window.location.pathname);
  console.log("step1Url : " + step1Url);

  switch (window.location.pathname) {
    case homeUrl:
      setStepContext(0);
      break;
    case step1Url:
      setStepContext(0);
      break;
    case step2Url:
      setStepContext(1);
      break;
    case step3Url:
      setStepContext(2);
      break;
    default:
      setStepContext(0);
      break;
  }
};
