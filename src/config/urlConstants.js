const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "https://127.0.0.1:8000/api";

export const apiSignUpUrl = `${apiUrl}/login_check`;
export const apiSignInUrl = `${apiUrl}/sign-in`;

export const fetchDataUserUrl = `${apiUrl}/user`;
export const scoreUrl = `${apiUrl}/score`;
export const compositionUrl = `${apiUrl}/composition`;
export const allScoreUrl = `${apiUrl}/scores`;
export const allCompositionUrl = `${apiUrl}/compositions`;

export const homeUrl = "/";
export const step1Url = "/rythme";
export const step2Url = "/percussions";
export const step3Url = "/apprentissage";
