import React from "react";
//components
//data
//styles
import "./Step3.style.scss";
//libraries
import { motion, useAnimation } from "framer-motion";
import { compositionData } from "../../mocks/compositionData";
import { useEffect } from "react";

export const JPAnimation = ({ startAnimation }) => {
  // const { composition } = useContext(CompositionContext);
  const allMovementSrcList = [];
  const allMovementDurationList = [];
  const imageDelayList = [0];
  const controls = useAnimation();
  const variants = {
    hidden: {
      opacity: 0,
    },
    playing: (i) => {
      return {
        opacity: 1,
        transition: {
          delay: imageDelayList[i] / 1000,
        },
      };
    },
  };

  const fillDurationAndSrcArrays = () => {
    compositionData.forEach((compositionItem) => {
      compositionItem.durationList.forEach((movementDuration) =>
        allMovementDurationList.push(movementDuration)
      );
      compositionItem.movementList.forEach((noteMovementSrc) =>
        allMovementSrcList.push(noteMovementSrc)
      );
    });
  };

  fillDurationAndSrcArrays();

  const addSumOfDelay = (previousSum, nextDuration) => {
    imageDelayList.push(previousSum + nextDuration);
    return previousSum + nextDuration;
  };

  allMovementDurationList.reduce(addSumOfDelay, 0);


  useEffect(()=>{
    if (startAnimation) {
      controls.start("playing");
    }
  },[controls, startAnimation])
  

  if (startAnimation && allMovementSrcList) {
    return allMovementSrcList.map((movementSrc, i) => {
      return (
        <motion.img
          className="movement-image"
          src={movementSrc}
          initial="hidden"
          animate={controls}
          exit="hidden"
          variants={variants}
          key={i}
          custom={i}
        />
      );
    });
  }

  return (
    <img
      className="movement-image"
      src={allMovementSrcList[0]}
      alt="first-movement"
    />
  );
};

// const JPAnimation = () => {
//   const { composition } = useContext(CompositionContext);
//   const controls = useAnimation();
//   const variants = {
//     visible: (i) => ({
//       opacity: 1,
//       transition: {
//         delay: i * 0.3,
//       },
//     }),
//     hidden: { opacity: 0 },
//   };

//   useEffect(() => {
//     controls.start(i => ({
//       opacity: 0,
//       x: 100,
//       transition: { delay: i * 0.3 },
//     }))
//   }, [controls])

//   return composition.map((compositionElement, i) => {
//     compositionElement.movementList.map((movement, j) => {
//       return (
//         <motion.img
//           id={`image-jp-${i}-${j}`}
//           className="movement-image"
//           key={`key-${i}-${j}`}
//           src={composition[i].movementList[j]}
//           initial={{ opacity: 1 }}
//           controls={controls}
//           variants={variants}
//           custom={compositionElement.duration}
//         />
//       );
//     });
//   });
// };

export default JPAnimation;
