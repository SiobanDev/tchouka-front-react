export const updateNavIconStyle = (navLinkList, navIconsList) => {
  const nextStepButtonContainer = document.getElementById("next-step");
  if (nextStepButtonContainer) {
    const nextStepButtonList = nextStepButtonContainer.getElementsByTagName(
      "a"
    );

    if (navLinkList && navIconsList && nextStepButtonList) {
      Array.from(navLinkList).map((navLink, i) => {
        if (navLink.classList.contains("selected")) {
          navIconsList[i].style.color = "#ff4436";
          navIconsList[i].style.background = "white";
          navIconsList[i].style.border = "solid #ff4436 2px";
        }

        if (window.location.href === navLink.href) {
          navIconsList[i].style.color = "#ff4436";
          navIconsList[i].style.background = "white";
          navIconsList[i].style.border = "solid #ff4436 2px";
        }

        navLink.addEventListener("click", () => {
          for (let navIcon of navIconsList) {
            navIcon.style.color = "white";
            navIcon.style.background = "#ff4436";
            navIcon.style.border = "solid #ff4436 2px";
          }

          navIconsList[i].style.color = "#ff4436";
          navIconsList[i].style.background = "white";
          navIconsList[i].style.border = "solid #ff4436 2px";
        });

        Array.from(nextStepButtonList).map((nextStepButton, i) => {
          nextStepButton.addEventListener("click", () => {
            for (let navIcon of navIconsList) {
              navIcon.style.color = "white";
              navIcon.style.background = "#ff4436";
              navIcon.style.border = "solid #ff4436 2px";
            }

            navIconsList[i].style.color = "#ff4436";
            navIconsList[i].style.background = "white";
            navIconsList[i].style.border = "solid #ff4436 2px";
          });
        });
      });
    }
  }
};
