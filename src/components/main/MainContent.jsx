import React, { useState, useEffect } from "react";
//Libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//components
import Step1 from "../step1/Step1";
import Step2 from "../step2/Step2";
import Step3 from "../step3/Step3";
import Opinions from "../opinions/Opinions";
import Home from "./Home";
import MyProfile from "./MyProfile";
import PrivateRoute from "./PrivateRoute";
//Views
import Header from "../../views/Header";
import Credits from "../../views/Credits";
import Footer from "../../views/Footer";
import SignUp from "../../views/SignUp";
import SignIn from "../../views/SignIn";
//Contexts
import ScoreContext from "../../context/ScoreContext";
import StepContext from "../../context/StepContext";
import CompositionContext from "../../context/CompositionContext";
import AnimationContext from "../../context/AnimationContext";
import NotificationContext from "../../context/NotificationContext";
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
  const [open, setOpen] = useState(false);
  const [lastSoundCount, setLastSoundCount] = useState(-1);
  const [isLastItemRemoved, setIsLastItemRemoved] = useState(false);
  const [severityKind, setSeverityKind] = useState("error");
  const [loggedIn, setLoggedIn] = useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState(
    "Une erreur est survenue."
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  return (
    <>
      <Router>
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
          <StepContext.Provider value={{ currentStep, setCurrentStep }}>
            <NotificationContext.Provider
              value={{
                severityKind,
                setSeverityKind,
                notificationMessage,
                setNotificationMessage,
                open,
                setOpen,
              }}
            >
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

                        <Route exact path="/connexion">
                          {loggedIn ? <Redirect to="/" /> : <SignUp />}
                        </Route>

                        <PrivateRoute
                          exact
                          path="/profil"
                          component={MyProfile}
                        />

                        <Route exact path="/credits" component={Credits} />

                        <Route exact path="/mon-avis" component={Opinions} />
                        <Route exact path="/apprentissage" component={Step3} />
                        <Route exact path="/percussions" component={Step2} />
                        <Route exact path="/rythme" component={Step1} />
                        <Route exact path="/" component={Home} />
                      </Switch>
                    </main>
                  </AnimationContext.Provider>
                </CompositionContext.Provider>
              </ScoreContext.Provider>
            </NotificationContext.Provider>
          </StepContext.Provider>
        </LoginContext.Provider>
      </Router>
      <Footer />
    </>
  );
};

export default MainContent;
