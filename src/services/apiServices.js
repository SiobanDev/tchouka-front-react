import {
  apiUrl,
  apiFetchAllScoresDataUrl,
  apiFetchAllCompositionsDataUrl,
  apiSignUpUrl,
  apiSignInUrl,
  apiCompositionUrl,
  apiScoreUrl,
} from "../config/urlConstants";

export const apiSignIn = async (userData) => {
  try {
    const req = new Request(apiSignInUrl, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const apiResponse = await fetch(req);

    if (apiResponse.ok) {
      return {
        success: true,
        data: await apiResponse.json(),
        message: "Mon inscription a bien été prise en compte.",
      };
    }
    //TO DO : error modal
    return {
      success: false,
      message: "Erreur d'inscription",
    };
  } catch (e) {
    return {
      success: false,
      message: "Impossible de s'inscrire",
    };
  }
};

export const apiSignUp = async (userData) => {
  try {
    const req = new Request(apiSignUpUrl, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const apiResponse = await fetch(req);

    if (apiResponse.ok) {
      return {
        success: true,
        data: await apiResponse.json(),
        message: "Je suis bien connecté.e !",
      };
    }
    //TO DO : error modal
    return {
      success: false,
      message: "Erreur de connexion",
    };
  } catch (e) {
    return {
      success: false,
      message: "Impossible de se connecter",
    };
  }
};

export const saveNewScore = async (userScore) => {
  let getToken = localStorage.getItem("token");

  try {
    const req = new Request(apiScoreUrl, {
      method: "POST",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${getToken}`
      }),
      body: JSON.stringify(userScore),
    });

    const apiResponse = await fetch(req);

    if (apiResponse.ok) {
      return {
        success: true,
        data: await apiResponse.json(),
        message: "Ma partition a bien été sauvegardée.",
      };
    }

    return {
      success: false,
      message: "Erreur de sauvegarde de la partition",
    };
  } catch {
    return {
      success: false,
      message: "Impossible de sauvegarder la partition",
    };
  }
};

export const deleteScore = async (userScoreId) => {
  let getToken = localStorage.getItem("token");

  try {
    const req = new Request(apiScoreUrl, {
      method: "DELETE",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${getToken}`
      }),
      body: JSON.stringify({scoreId: userScoreId}),
    });

    const apiResponse = await fetch(req);

    if (apiResponse.ok) {
      return {
        success: true,
        data: await apiResponse.json(),
        message: "Ma partition a bien été supprimée.",
      };
    }

    return {
      success: false,
      message: "Erreur de suppression de la partition",
    };
  } catch {
    return {
      success: false,
      message: "Impossible de supprimer la partition",
    };
  }
};

export const saveNewComposition = async (userComposition) => {
  let getToken = localStorage.getItem("token");

  try {
    const req = new Request(apiCompositionUrl, {
      method: "POST",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${getToken}`

      }),
      body: JSON.stringify(userComposition),
    });

    const apiResponse = await fetch(req);

    if (apiResponse.ok) {
      return {
        success: true,
        data: await apiResponse.json(),
        message: "Ma composition a bien été sauvegardée.",
      };
    }

    return {
      success: false,
      message: "Erreur de sauvegarde de la composition",
    };
  } catch {
    return {
      success: false,
      message: "Impossible de sauvegarder la composition",
    };
  }
};


export const deleteComposition = async (userCompositionId) => {
  let getToken = localStorage.getItem("token");

  try {
    const req = new Request(apiCompositionUrl, {
      method: "DELETE",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${getToken}`

      }),
      body: JSON.stringify(userCompositionId),
    });

    const apiResponse = await fetch(req);

    if (apiResponse.ok) {
      return {
        success: true,
        data: await apiResponse.json(),
        message: "Ma partition a bien été supprimée.",
      };
    }

    return {
      success: false,
      message: "Erreur de suppression de la partition",
    };
  } catch {
    return {
      success: false,
      message: "Impossible de supprimer la partition",
    };
  }
};

export const apiGetAllScoresData = async () => {
  let getToken = localStorage.getItem("token");

  try {
    const req = new Request(apiFetchAllScoresDataUrl, {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${getToken}`

      }),
    });

    const apiResponse = await fetch(req);

    if (apiResponse.ok) {
      return {
        success: true,
        data: await apiResponse.json(),
        message: "Les partitions ont été correctement chargées.",
      };
    }
    //TO DO : error modal
    return {
      success: false,
      message: "Erreur de récupération des partitions",
    };
  } catch (e) {
    return {
      success: false,
      message: "Impossible de récupérer les partitions",
    };
  }
};

export const apiGetAllCompositionsData = async () => {
  let getToken = localStorage.getItem("token");

  try {
    const req = new Request(apiFetchAllCompositionsDataUrl, {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${getToken}`

      }),
    });

    const apiResponse = await fetch(req);

    if (apiResponse.ok) {
      return {
        success: true,
        data: await apiResponse.json(),
        message: "Les compositions ont été correctement chargées.",
      };
    }
    //TO DO : error modal
    return {
      success: false,
      message: "Erreur de récupération des compositions",
    };
  } catch (e) {
    return {
      success: false,
      message: "Impossible de récupérer les compositions",
    };
  }
};
