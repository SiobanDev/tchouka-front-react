import React, { useContext, useEffect } from "react";
//components
//data
//styles
import "./Step3.style.scss";
//libraries
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import CompositionContext from "../../context/CompositionContext";

const JPAnimation = () => {
  const { composition } = useContext(CompositionContext);
  const controls = useAnimation();
  const variants = {
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
      },
    }),
    hidden: { opacity: 0 },
  };

  useEffect(() => {
    controls.start(i => ({
      opacity: 0,
      x: 100,
      transition: { delay: i * 0.3 },
    }))
  }, [controls])

  return composition.map((compositionElement, i) => {
    compositionElement.movementList.map((movement, j) => {
      return (
        <motion.img
          id={`image-jp-${i}-${j}`}
          className="movement-image"
          key={`key-${i}-${j}`}
          src={composition[i].movementList[j]}
          initial={{ opacity: 1 }}
          controls={controls}
          variants={variants}
          custom={compositionElement.duration}
        />
      );
    });
  });
};

export default JPAnimation;
