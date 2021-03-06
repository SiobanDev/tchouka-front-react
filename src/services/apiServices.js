import {
  apiSignUpUrl,
  apiSignInUrl,
  scoreUrl,
  compositionUrl,
  fetchDataUserUrl,
  allScoreUrl,
allCompositionUrl
} from "../config/urlConstants";

const fetchApi = async (
  req,
  successMessage,
  errorMessage,
  exceptionMessage
) => {
  try {
    const apiResponse = await fetch(req);
    const jsonApiResponse = await apiResponse.json();

    if (apiResponse.ok) {
      return {
        success: true,
        data: jsonApiResponse,
        message: successMessage,
      };
    }
    return {
      success: false,
      message: `${errorMessage} ${
        jsonApiResponse.message && ": " + jsonApiResponse.message
      }`,
    };
  } catch (e) {
    return {
      success: false,
      message: exceptionMessage,
    };
  }
};

export const apiSignIn = async (userData) => {
  const req = new Request(apiSignInUrl, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  const successMessage = "Inscription réussie";
  const errorMessage = "Erreur d'inscrition";
  const exceptionMessage = "Impossible de s'inscrire";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

export const apiSignUp = async (userData) => {
  const req = new Request(apiSignUpUrl, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  const successMessage = "Connexion réussie";
  const errorMessage = "Erreur de connexion";
  const exceptionMessage = "Impossible de se connecter";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

export const saveNewUserData = async (
  userCreationData,
  userCreationDataType
) => {
  let getToken = localStorage.getItem("token");

  const req = new Request(userCreationDataType === "score" ? scoreUrl : compositionUrl, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
    body: JSON.stringify(userCreationData),
  });

  const successMessage = `La ${userCreationDataType === 'score' && "partition"} a bien été sauvegardée.`;
  const errorMessage = `Erreur de sauvegarde de la ${userCreationDataType === 'score' && "partition"}`;
  const exceptionMessage = `Impossible de sauvegarder la ${userCreationDataType === 'score' && "partition"}`;

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

export const deleteUserData = async (
  userCreationDataId,
  userCreationDataType
) => {
  let getToken = localStorage.getItem("token");

  const req = new Request(userCreationDataType === "score" ? scoreUrl : compositionUrl, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
    body: JSON.stringify(userCreationDataId),
  });

  const successMessage = `La ${userCreationDataType === 'score' && "partition"} a bien été supprimée.`;
  const errorMessage = `Erreur de suppression de la ${userCreationDataType === 'score' && "partition"}`;
  const exceptionMessage = `Impossible de supprimer la ${userCreationDataType === 'score' && "partition"}`;

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

// export const apiGetUserData = async () => {
//   let getToken = localStorage.getItem("token");

//   const req = new Request(fetchDataUserUrl, {
//     method: "GET",
//     headers: new Headers({
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       Authorization: `Bearer ${getToken}`,
//       'Access-Control-Allow-Methods': 'GET'
//     }),
//     mode: 'cors'
//   });

//   const successMessage =
//     "Les données de l'utilisat.eur.rice ont été correctement chargées.";
//   const errorMessage =
//     "Erreur de récupération les données de l'utilisat.eur.rice";
//   const exceptionMessage =
//     "Impossible de récupérer les données de l'utilisat.eur.rice";

//   return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
// };


export const apiGetUserEmail = async () => {
  let getToken = localStorage.getItem("token");

  const req = new Request(fetchDataUserUrl, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${getToken}`,
      'Access-Control-Allow-Methods': 'GET'
    }),
    mode: 'cors'
  });

  const successMessage =
    "Les données de l'utilisat.eur.rice ont été correctement chargées.";
  const errorMessage =
    "Erreur de récupération les données de l'utilisat.eur.rice";
  const exceptionMessage =
    "Impossible de récupérer les données de l'utilisat.eur.rice";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};


export const apiFetchScores = async () => {
  let getToken = localStorage.getItem("token");

  const req = new Request(allScoreUrl, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${getToken}`,
      'Access-Control-Allow-Methods': 'GET'
    }),
    mode: 'cors'
  });

  const successMessage =
    "Les données de l'utilisat.eur.rice ont été correctement chargées.";
  const errorMessage =
    "Erreur de récupération les données de l'utilisat.eur.rice";
  const exceptionMessage =
    "Impossible de récupérer les données de l'utilisat.eur.rice";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};


export const apiFetchCompositions = async () => {
  let getToken = localStorage.getItem("token");

  const req = new Request(allCompositionUrl, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${getToken}`,
      'Access-Control-Allow-Methods': 'GET'
    }),
    mode: 'cors'
  });

  const successMessage =
    "Les données de l'utilisat.eur.rice ont été correctement chargées.";
  const errorMessage =
    "Erreur de récupération les données de l'utilisat.eur.rice";
  const exceptionMessage =
    "Impossible de récupérer les données de l'utilisat.eur.rice";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};
