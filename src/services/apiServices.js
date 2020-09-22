import {
  apiFetchAllScoresDataUrl,
  apiFetchAllCompositionsDataUrl,
  apiSignUpUrl,
  apiSignInUrl,
  apiCompositionUrl,
  apiScoreUrl,
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

export const saveNewScore = async (userScore) => {
  let getToken = localStorage.getItem("token");

  const req = new Request(apiScoreUrl, {
    method: "POST",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
    body: JSON.stringify(userScore),
  });

  const successMessage = "La partition a bien été sauvegardée.";
  const errorMessage = "Erreur de sauvegarde de la partition";
  const exceptionMessage = "Impossible de sauvegarder la partition";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

export const deleteScore = async (userScoreId) => {
  let getToken = localStorage.getItem("token");

  const req = new Request(apiScoreUrl, {
    method: "DELETE",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
    body: JSON.stringify({ scoreId: userScoreId }),
  });

  const successMessage = "La partition a bien été supprimée.";
  const errorMessage = "Erreur de suppression de la partition";
  const exceptionMessage = "Impossible de supprimer la partition";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

export const saveNewComposition = async (userComposition) => {
  let getToken = localStorage.getItem("token");

  const req = new Request(apiCompositionUrl, {
    method: "POST",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
    body: JSON.stringify(userComposition),
  });

  const successMessage = "La composition a bien été sauvegardée.";
  const errorMessage = "Erreur de sauvegarde de la composition";
  const exceptionMessage = "Impossible de sauvegarder la composition";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

export const deleteComposition = async (userCompositionId) => {
  let getToken = localStorage.getItem("token");

  const req = new Request(apiCompositionUrl, {
    method: "DELETE",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
    body: JSON.stringify(userCompositionId),
  });

  const successMessage = "La composition a bien été supprimée.";
  const errorMessage = "Erreur de suppression de la composition";
  const exceptionMessage = "Impossible de supprimer la composition";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

export const apiGetAllScoresData = async () => {
  let getToken = localStorage.getItem("token");

  const req = new Request(apiFetchAllScoresDataUrl, {
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
  });

  const successMessage = "Les partitions ont été correctement chargées.";
  const errorMessage = "Erreur de récuparation des partitions";
  const exceptionMessage = "Impossible de récupérer les partitions";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

export const apiGetAllCompositionsData = async () => {
  let getToken = localStorage.getItem("token");

  const req = new Request(apiFetchAllCompositionsDataUrl, {
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
  });

  const successMessage = "Les compositions ont été correctement chargées.";
  const errorMessage = "Erreur de récuparation des compositions";
  const exceptionMessage = "Impossible de récupérer les compositions";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};
