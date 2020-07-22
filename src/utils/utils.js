export const handleClickToAnotherPage = (stepContext, nextStep) => {
  const LinkList = document.getElementsByClassName("navbar-link");
  var nextStepsList = [];

  if (LinkList) {
    Array.from(LinkList).map((link) => link.classList.remove("active"));

    if (nextStepsList && stepContext) {
      stepContext.setEndedStep(nextStep);
      console.log("stepContext.endedStep: " + stepContext.endedStep);

      LinkList[nextStep].classList.add("active");

      for (var i = 0; i <= nextStep; i++) {
        nextStepsList.includes(i);
        console.log("nextStepsList : " + nextStepsList);
      }
    }
  }
};
