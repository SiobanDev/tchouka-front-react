import { apiUrl } from "../config/urlConstants";

export const apiSignUp = async () => {
  try {
    const req = new Request(`${apiUrl}notes`, {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
    });

    const apiResponse = await fetch(req);

    if (apiResponse.ok) {
      return {
        success: true,
        data: await apiResponse.json(),
        message: "Default notes data duly get from the DB.",
      };
    }
    //TO DO : error modal
    return {
      success: false,
      message: "Failed to get default notes data from the DB",
    };
  } catch (e) {
    return {
      success: false,
      message: "Failed to reach the API.",
    };
  }
};


export const saveNewComposition = async (userComposition) => {
    try {
        const req = new Request(`${apiUrl}composition`, {
            method: "PUT",
            headers: new Headers({
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(userComposition),
          });

      const apiResponse = await fetch(req);
  
      if (apiResponse.ok) {
        return {
          success: true,
          data: await apiResponse.json(),
          message: "User composition duly saved in the DB.",
        };
      }
  
      return {
        success: false,
        message: "Failed to save user composition in the DB",
      };
    } catch {
      return {
        success: false,
        message: "Failed to reach the API.",
      };
    }
  };
  