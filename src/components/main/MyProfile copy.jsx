import React, { useEffect, useCallback, useContext, useState } from "react";

import {
  apiGetUserData,
  deleteUserData,
} from "../../services/apiServices";
//libraries
import Loader from "react-loader-spinner";
import { handleUserCreationDataUpload } from "./MyProfile.services";
import NotificationContext from "../../context/NotificationContext";
//styles
import "./MyProfile.style.scss";

const MyProfile = () => {
  const [waitingForApiResponse, setWaitingForApiResponse] = React.useState(
    true
  );
  const notificationContext = useContext(NotificationContext);

  const scoreList = [];
  const compositionList = [];
  const apiErrorMessage = "Erreur avec la récupération des données.";
  const [userEmail, setUserEmail] = useState(null);

  const getUserEmail = useCallback(async () => {
    const userIdData = {
      id: localStorage.getItem("userId") && localStorage.getItem("userId")
    }

    try {
      const formattedApiResponse = await apiGetUserData();

      if (formattedApiResponse) {
        setUserEmail(formattedApiResponse.data.email);

        formattedApiResponse.data.scoreList.map((score) => {
          scoreList.push(
            <li key={score.id}>
              <div className="user-data-number round-icon">{score.length}</div>
              <p className="score-title">{score.title}</p>
              <i
                className="fas fa-trash edition-button"
                onClick={() => deleteUserData(userIdData, "score")}
              ></i>
              <i
                className="fas fa-share edition-button"
                onClick={() =>
                  handleUserCreationDataUpload(
                    score,
                    "score",
                    notificationContext
                  )
                }
              ></i>
            </li>
          );
        });

        formattedApiResponse.data.compositionList.map((composition) => {
          compositionList.push(
            <li>
              <div className="user-data-number round-icon">
                {composition.length}
              </div>
              <p className="composition-title">{composition.title}</p>
              <i
                className="fas fa-trash edition-button"
                onClick={() => deleteUserData(composition.id, "composition")}
              ></i>
              <i
                className="fas fa-share edition-button"
                onClick={() =>
                  handleUserCreationDataUpload(
                    composition,
                    "composition",
                    notificationContext
                  )
                }
              ></i>
            </li>
          );
        });
      }
      setWaitingForApiResponse(false);
    } catch (e) {
      setWaitingForApiResponse(false);
      console.log("Error in MyProfile : " + e);
    }
  }, [compositionList, notificationContext, scoreList]);

  useEffect(() => {
    getUserEmail();
  }, [getUserEmail]);

  return (
    <section id="my-profile" className="main-content">
      <div id="profile-header">
        <div className="profile-icon">T</div>
        <p className="profile-email">{userEmail}</p>
      </div>

      <div id="profile-content">
        <div className="column1">
          <div className="user-data-header">
            <div className="user-creation-total-count">{scoreList.length}</div>
            <h4>Mes partitions TCHoUKA</h4>
            <ul className="user-data-content">
              {waitingForApiResponse ? (
                <Loader
                  type="TailSpin"
                  color="#2ca4a0ff"
                  height={45}
                  width={45}
                />
              ) : scoreList.length > 0 ? (
                scoreList
              ) : (
                apiErrorMessage
              )}
            </ul>
          </div>
        </div>

        <div className="column2">
          <div className="user-data-header">
            <div className="user-creation-total-count">
              {compositionList.length}
            </div>
            <h4>Mes compositions TCHoUKA</h4>
            <ul className="user-data-content">
              {waitingForApiResponse ? (
                <Loader
                  type="TailSpin"
                  color="#2ca4a0ff"
                  height={45}
                  width={45}
                />
              ) : compositionList.length > 0 ? (
                compositionList
              ) : (
                apiErrorMessage
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
