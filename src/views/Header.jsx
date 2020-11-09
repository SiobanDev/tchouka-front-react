import React, { useContext, useEffect } from "react";
import Nav from "../components/main/navbar/Nav";
//styles
import "./Header.style.scss";
//Components
import AuthSection from "../components/shared/AuthSection";
//Context
import StepContext from "../context/StepContext";
//Constants
import { learningStep, percussionStep, rythmStep } from "../config/mainConstants";

const Header = () => {
  const { setCurrentStep } = useContext(StepContext);

  useEffect(() => {
    if (localStorage.getItem("composition")) {
      setCurrentStep(learningStep);
    } else if (localStorage.getItem("score")) {
      setCurrentStep(percussionStep);
    } else {
      setCurrentStep(rythmStep);
    }
  }, [setCurrentStep]);

  return (
    <header>
      <AuthSection />
      <h1>TCHoUKA</h1>
      <Nav />
    </header>
  );
};

export default Header;
