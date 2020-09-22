import {
  apiSignUpUrl,
  apiSignInUrl,
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

  const req = new Request(`${userCreationDataType}Url`, {
    method: "POST",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
    body: JSON.stringify(userCreationData),
  });

  const successMessage = `La ${userCreationDataType} a bien été sauvegardée.`;
  const errorMessage = `Erreur de sauvegarde de la ${userCreationDataType}`;
  const exceptionMessage = `Impossible de sauvegarder la ${userCreationDataType}`;

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

export const deleteUserData = async (
  userCreationDataId,
  userCreationDataType
) => {
  let getToken = localStorage.getItem("token");

  const req = new Request(`${userCreationDataType}Url`, {
    method: "DELETE",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
    body: JSON.stringify({ id: userCreationDataId }),
  });

  const successMessage = `La ${userCreationDataType} a bien été supprimée.`;
  const errorMessage = `Erreur de suppression de la ${userCreationDataType}`;
  const exceptionMessage = `Impossible de supprimer la ${userCreationDataType}`;

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};

export const apiGetUserData = async () => {
  let getToken = localStorage.getItem("token");

  const req = new Request(apiGetUserData, {
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    }),
  });

  const successMessage =
    "Les données de l'utilisat.eur.rice ont été correctement chargées.";
  const errorMessage =
    "Erreur de récupération les données de l'utilisat.eur.rice";
  const exceptionMessage =
    "Impossible de récupérer les données de l'utilisat.eur.rice";

  return await fetchApi(req, successMessage, errorMessage, exceptionMessage);
};
