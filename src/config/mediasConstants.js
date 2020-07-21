export const apiUrl = "https://127.0.0.1:8000/";

export const quarterBeatDuration = 250;
export const halfBeatDuration = 500;
export const oneBeatDuration = 1000;
export const TwoBeatsDuration = 2000;
export const FourBeatsDuration = 4000;

const audioPath = "/media/audio/";
const imagePath = "/media/images/";
const movementPath = "/media/images/movements/";
const notePath = "/media/images/notes/";

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
const biImages = [movementPath + "bi-rd.svg"];
const bouImages = [movementPath + "bou-rd.svg"];
const claImages = [movementPath + "cla-rd.svg"];
const diImages = [movementPath + "di-rd.svg"];
const douImages = [movementPath + "dou-rd.svg"];
const piImages = [
  movementPath + "pi-debut-rd.svg",
  movementPath + "pi-fin-rd.svg",
];
const pouImages = [
  movementPath + "pou-debut-rd.svg",
  movementPath + "pou-fin-rd.svg",
];
const tchiImages = [
  movementPath + "tchi-debut-rd.svg",
  movementPath + "tchi-fin-rd.svg",
];
const tchouImages = [
  movementPath + "tchou-debut-rd.svg",
  movementPath + "tchou-fin-rd.svg",
];
export const movementList = {bi: biImages,
  bou: bouImages,
  cla: claImages,
  di: diImages,
  dou: douImages,
  pi: piImages,
  pou: pouImages,
  tchi: tchiImages,
  tchou: tchouImages,};

const biSound = audioPath + "bi.mp3";
const bouSound = audioPath + "bou.mp3";
const claSound = audioPath + "cla.mp3";
const diSound = audioPath + "di.mp3";
const douSound = audioPath + "dou.mp3";
const piSound = audioPath + "pi.mp3";
const pouSound = audioPath + "pou.mp3";
const tchiSound = audioPath + "tchi.mp3";
const tchouSound = audioPath + "tchou.mp3";

export const soundList = {bi: biSound,
  bou: bouSound,
  cla: claSound,
  di: diSound,
  dou: douSound,
  pi: piSound,
  pou: pouSound,
  tchi: tchiSound,
  tchi: tchouSound,};
