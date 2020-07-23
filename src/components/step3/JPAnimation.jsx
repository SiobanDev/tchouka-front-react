import React, { useEffect } from "react";
//components
//data
//styles
import "./Step3.style.scss";
//libraries
import { motion } from "framer-motion";
import { useState } from "react";

const JPAnimation = ({ notes, timeCode, startAnimation }) => {
  const [noteIndex, setNoteIndex] = useState(0);
  const [movementIndex, setMovementIndex] = useState(0);
  let timer = null;

  if (startAnimation) {
    if (notes[noteIndex].movement.length > 1 && movementIndex < notes[noteIndex].movement.length) {
      timer = setTimeout(() => {
        if (noteIndex < notes.length) {
          setNoteIndex(noteIndex);
        }
      }, (notes[noteIndex].duration * 1000) / 2);

      clearTimeout(timer);

      setMovementIndex(movementIndex + 1);

      timer = setTimeout(() => {
        if (noteIndex < notes.length) {
          setNoteIndex(noteIndex);
        }
      }, (notes[noteIndex].duration * 1000) / 2);

      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        if (noteIndex < notes.length) {
          setNoteIndex(noteIndex++);
        }
      }, notes[noteIndex].duration * 1000);
      clearTimeout(timer);
    }
  }

  const getDurationOfAllPreviousNotes = (notes, indexOfTheCurrentNote) => {
    let durationList = [];
    for (let i = 0; i < indexOfTheCurrentNote; i++) {
      durationList.push(notes[i].duration);
    }
    let sumOfPreviousDurations = durationList.reduce(function (a, b) {
      return a + b;
    }, 0);

    // console.log("sumOfPreviousDurations" + sumOfPreviousDurations);
    return sumOfPreviousDurations * 1000;
  };

  // console.log("notes : " + JSON.stringify(notes, null, " "));
  // console.log("timeCode in JPAnimation: " + timeCode);

  //       <img
  //         className="movement-image"
  //         src={
  //           notes[notes.length - 1].movement[
  //             notes[notes.length - 1].movement.length - 1
  //           ]
  //         }
  //         alt="last-image-of-jp"
  //       />

  // for (let i = 0; i < notes.length; i++) {
  //   for (let y = 0; y < notes[i].movement.length; y++) {
  console.log("timeCode in JPAnimation: " + timeCode);

  if (timeCode === getDurationOfAllPreviousNotes(notes, noteIndex)) {
    return (
      <motion.img
        id={`image-jp-${noteIndex}-${movementIndex}`}
        className="movement-image"
        key={`key-${noteIndex}-${movementIndex}`}
        src={notes[noteIndex].movement[movementIndex]}
        initial={{ opacity: 1, position: "absolute" }}
        exit={{ opacity: 0 }}
        transition={{
          ease: "linear",
          duration: 1,
          delay: 0,
        }}
      />
    );
  }
  //   }
  // }

  return (
    <img
      className="movement-image"
      src={
        notes[notes.length - 1].movement[
          notes[notes.length - 1].movement.length - 1
        ]
      }
      alt="last-image-of-jp"
    />
  );

  //TO DO : reset AFTER render ! I need to catch the moment of the animation's end (setTimeOut on the whole notes duration ?)
  // resetAnimation(false);
};

export default JPAnimation;
