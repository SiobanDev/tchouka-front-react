import {
  apiUrl,
  quarterBeatDuration,
  halfBeatDuration,
  oneBeatDuration,
  TwoBeatsDuration,
  FourBeatsDuration,
  quarterBeatImage,
  halfBeatImage,
  oneBeatImage,
  TwoBeatsImage,
  FourBeatsImage,
} from "../config/constants";

export const fetchNotesData = async () => {
  try {
    const req = new Request(`${apiUrl}notes`, {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
    });

    const apiResponse = await fetch(req);

    return apiResponse;
  } catch (error) {
    console.log("Default notes data couldn't be get : " + error);
  }
};

export const getDefaultNotes = async () => {
  try {
    const apiResponse = await fetchNotesData();

    if (apiResponse && apiResponse.ok) {
      const availableNotesList = await apiResponse.json();
      console.log("availableNotesList in utils: " + JSON.stringify(availableNotesList));

      return availableNotesList;
    }
    //TO DO : error modal
    console.log("Error trying to get default notes : " + apiResponse.status);
  } catch (e) {
    console.log(e);
  }
};
