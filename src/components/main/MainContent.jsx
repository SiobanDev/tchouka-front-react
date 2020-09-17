import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//components
import Step1 from "../step1/Step1";
import Step2 from "../step2/Step2";
import Step3 from "../step3/Step3";
import Home from "./Home";
import Header from "../../views/Header";
import PartitionContext from "../../context/PartitionContext";
import StepContext from "../../context/StepContext";
import CompositionContext from "../../context/CompositionContext";
import AnimationContext from "../../context/AnimationContext";

const MainContent = () => {
  var freeTime = 42;
  const addedNoteWidth = 5;
  const [allNotesWidth, setAllNotesWidth] = useState(0);
  const [partition, setPartition] = useState([]);
  const [composition, setComposition] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [timeCode, setTimeCode] = useState(0);
  const [lastSoundCount, setLastSoundCount] = useState(-1);
  const [isLastItemRemoved, setIsLastItemRemoved] = useState(false);

  // console.log("partition dans MainContent " + JSON.stringify(partition));
  // console.log("allNotesWidth dans MainContent" + allNotesWidth);
  //console.log("composition dans MainContent " + JSON.stringify(composition));

  return (
    <Router>
      <StepContext.Provider value={{ currentStep, setCurrentStep }}>
        <PartitionContext.Provider
          value={{
            partition,
            setPartition,
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
                  <Route exact path="/apprentissage" component={Step3} />

                  <Route exact path="/percussions" component={Step2} />

                  <Route exact path="/rythme" component={Step1} />
                  <Route exact path="/" component={Home} />
                </Switch>
              </main>
            </AnimationContext.Provider>
          </CompositionContext.Provider>
        </PartitionContext.Provider>
      </StepContext.Provider>
    </Router>
  );
};

export default MainContent;
