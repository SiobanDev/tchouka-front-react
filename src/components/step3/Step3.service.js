export const getCompositionDuration = (notes) => {
    let durationList = [];

    if (notes.length > 0) {
      for (let i = 0; i < notes.length; i++) {
        durationList.push(notes[i].duration);
      }
      const sumOfAllDurations = durationList.reduce(function (a, b) {
        return a + b;
      });

    //   const convertedDurationSum = sumOfAllDurations
      console.log("sumOfAllDurations : " + sumOfAllDurations);

      return sumOfAllDurations;
    }
    return 0;
  };