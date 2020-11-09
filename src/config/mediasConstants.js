//TODO add quarter beat
// export const quarterBeatDuration = 250;
export const halfBeatDuration = 125;
export const oneBeatDuration = 250;
export const TwoBeatsDuration = 500;
export const FourBeatsDuration = 1000;

const audioPath = "/media/audio/";
const imagePath = "/media/images/";
const movementPath = "/media/images/movements/";
// const notePath = "/media/images/notes/";

export const redStave = imagePath + "red-stave.svg";
export const blueStave = imagePath + "blue-stave.svg";
// export const quarterBeatImage = notePath + "quarter-beat.svg";
// export const halfBeatImage = notePath + "half-beat.svg";
// export const oneBeatImage = notePath + "one-beat.svg";
// export const TwoBeatsImage = notePath + "two-beats.svg";
// export const FourBeatsImage = notePath + "four-beats.svg";

export const bodyPartList = [
  "tchou",
  "tchi",
  "cla",
  "bou",
  "bi",
  "dou",
  "di",
  "pou",
  "pi",
];

export const jpNeutre = movementPath + "position-neutre.svg";
export const jpNeutreTransp = movementPath + "position-neutre-transp.svg";
const biImages = [movementPath + "bi.svg"];
const bouImages = [movementPath + "bou.svg"];
const claImages = [movementPath + "cla.svg"];
const diImages = [movementPath + "di.svg"];
const douImages = [movementPath + "dou.svg"];
const piImages = [movementPath + "pi-debut.svg", movementPath + "pi-fin.svg"];
const pouImages = [
  movementPath + "pou-debut.svg",
  movementPath + "pou-fin.svg",
];
const tchiImages = [
  movementPath + "tchi-debut.svg",
  movementPath + "tchi-fin.svg",
];
const tchouImages = [
  movementPath + "tchou-debut.svg",
  movementPath + "tchou-fin.svg",
];
export const movementList = {
  bi: biImages,
  bou: bouImages,
  cla: claImages,
  di: diImages,
  dou: douImages,
  pi: piImages,
  pou: pouImages,
  tchi: tchiImages,
  tchou: tchouImages,
};

const biSound = audioPath + "bi.mp3";
const bouSound = audioPath + "bou.mp3";
const claSound = audioPath + "cla.mp3";
const diSound = audioPath + "di.mp3";
const douSound = audioPath + "dou.mp3";
const piSound = audioPath + "pi.mp3";
const pouSound = audioPath + "pou.mp3";
const tchiSound = audioPath + "tchi.mp3";
const tchouSound = audioPath + "tchou.mp3";

export const soundList = {
  bi: biSound,
  bou: bouSound,
  cla: claSound,
  di: diSound,
  dou: douSound,
  pi: piSound,
  pou: pouSound,
  tchi: tchiSound,
  tchou: tchouSound,
};
