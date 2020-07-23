export const updateNavIconStyle = (futureStep) => {
  const navIconsList = document.getElementsByClassName("menu-icon");
  console.log("futureStep in Nav.service: " + futureStep);

  if (navIconsList) {
    Array.from(navIconsList).map((icon) => icon.classList.remove("active"));
    navIconsList[futureStep].classList.add("active");
  }
};
