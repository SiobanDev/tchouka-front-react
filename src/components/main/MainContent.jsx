import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//components
import Step1 from "../step1/Step1";
import Step2 from "../step2/Step2";
import Step3 from "../step3/Step3";
import Home from "./Home";
import Header from "../../views/Header";
import ScoreContext from "../../context/ScoreContext";
import StepContext from "../../context/StepContext";
import CompositionContext from "../../context/CompositionContext";
import AnimationContext from "../../context/AnimationContext";
import TermsAndConditions from "../../views/TermsAndConditions";
import Credits from "../../views/Credits";
import Footer from "../../views/Footer";
import NotificationContext from "../../context/NotificationContext";
import SignUp from "../../views/SignUp";
import SignIn from "../../views/SignIn";
import LoginContext from "../../context/LoginContext";

const MainContent = () => {
  var freeTime = 42;
  const addedNoteWidth = 5;
  const [allNotesWidth, setAllNotesWidth] = useState(0);
  const [score, setScore] = useState([]);
  const [composition, setComposition] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [timeCode, setTimeCode] = useState(0);
  const [lastSoundCount, setLastSoundCount] = useState(-1);
  const [isLastItemRemoved, setIsLastItemRemoved] = useState(false);
  const [goBackBeginning, setGoBackBeginning] = useState(false);
  const [severityKind, setSeverityKind] = useState("error");
  const [loggedIn, setLoggedIn] = useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState(
    "Une erreur est survenue."
  );

  // console.log("score dans MainContent " + JSON.stringify(score));
  // console.log("allNotesWidth dans MainContent" + allNotesWidth);
  //console.log("composition dans MainContent " + JSON.stringify(composition));

  return (
    <>
      <Router>
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
          <NotificationContext.Provider
            value={{
              severityKind,
              setSeverityKind,
              notificationMessage,
              setNotificationMessage,
            }}
          >
            <StepContext.Provider value={{ currentStep, setCurrentStep }}>
              <ScoreContext.Provider
                value={{
                  score,
                  setScore,
                  freeTime,
                  allNotesWidth,
                  setAllNotesWidth,
                  addedNoteWidth,
                }}
              >
                <CompositionContext.Provider
                  value={{
                    composition,
                    setComposition,
                    isLastItemRemoved,
                    setIsLastItemRemoved,
                  }}
                >
                  <Header />
                  <AnimationContext.Provider
                    value={{
                      playingAnimation,
                      setPlayingAnimation,
                      goBackBeginning,
                      setGoBackBeginning,
                      timeCode,
                      setTimeCode,
                      repeat,
                      setRepeat,
                      lastSoundCount,
                      setLastSoundCount,
                    }}
                  >
                    <main>
                      <Switch>
                        <Route exact path="/inscription" component={SignIn} />

                        <Route exact path="/connexion" component={SignUp}>
                          {loggedIn ? (
                            <Redirect to="/dashboard" />
                          ) : (
                            <PublicHomePage />
                          )}
                        </Route>
                        <Route exact path="/credits" component={Credits} />
                        <Route
                          exact
                          path="/conditions-generales-utilisation"
                          component={TermsAndConditions}
                        />
                        <Route exact path="/apprentissage" component={Step3} />
                        <Route exact path="/percussions" component={Step2} />
                        <Route exact path="/rythme" component={Step1} />
                        <Route exact path="/" component={Home} />
                      </Switch>
                    </main>
                  </AnimationContext.Provider>
                </CompositionContext.Provider>
              </ScoreContext.Provider>
            </StepContext.Provider>
          </NotificationContext.Provider>
        </LoginContext.Provider>
      </Router>
      <Footer />
    </>
  );
};

export default MainContent;
