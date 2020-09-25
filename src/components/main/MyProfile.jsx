import React, { useEffect, useCallback, useContext, useState } from "react";

import {
  apiGetUserEmail,
  deleteUserData,
  apiFetchScores,
  apiFetchCompositions,
} from "../../services/apiServices";
//libraries
import Loader from "react-loader-spinner";
import NotificationContext from "../../context/NotificationContext";
//styles
import "./MyProfile.style.scss";
import CompositionContext from "../../context/CompositionContext";
import ScoreContext from "../../context/ScoreContext";
import AlertModal from "../shared/AlertModal";

const MyProfile = () => {
  const [waitingForApiResponse, setWaitingForApiResponse] = React.useState(
    true
  );
  const {
    setOpen,
    setSeverityKind,
    setNotificationMessage,
    open,
    notificationMessage,
    severityKind,
  } = useContext(NotificationContext);
  const [scoreList, setScoreList] = useState(null);
  const [compositionList, setCompositionList] = useState(null);
  const apiErrorMessage = "Erreur avec la récupération des données.";
  const [userEmail, setUserEmail] = useState(null);
  const { setComposition, composition } = useContext(CompositionContext);
  const { score, setScore } = useContext(ScoreContext);

  const dialogHandleClickClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, [score, composition]);

  const handleDataDelete = async (dataId, dataType) => {
    try {
      setWaitingForApiResponse(true);
      const ApiResponse = await deleteUserData(dataId, dataType);
      if (ApiResponse) {
        setWaitingForApiResponse(false);
      }
    } catch (e) {
      setWaitingForApiResponse(false);
      console.log("Error in MyProfile : " + e);
    }
  };

  const handleUserCreationDataUpload = useCallback(
    (userCreationData, userCreationDataType) => {
      userCreationDataType === "score"
        ? setScore(userCreationData)
        : setComposition(userCreationData);

      const dataToStorage =
        userCreationDataType === "score"
          ? JSON.stringify(userCreationData.notes)
          : JSON.stringify(userCreationData.movements);

      localStorage.setItem(userCreationDataType, dataToStorage);
      setSeverityKind("success");
      setNotificationMessage(
        `Ma ${
          userCreationDataType === "score" && "partition"
        } a été chargée à l'étape ${
          userCreationDataType === "score" ? "1" : "2"
        }.`
      );
      setOpen(true);
    },
    [setComposition, setNotificationMessage, setOpen, setScore, setSeverityKind]
  );

  const getUserEmail = useCallback(async () => {
    try {
      const EmailApiResponse = await apiGetUserEmail();

      if (EmailApiResponse) {
        setUserEmail(EmailApiResponse.data);
      }

      setWaitingForApiResponse(false);
    } catch (e) {
      setWaitingForApiResponse(false);
      console.log("Error in MyProfile : " + e);
    }
  }, []);

  const getUserCompositions = useCallback(async () => {
    try {
      const compositionDataApiResponse = await apiFetchCompositions();

      if (compositionDataApiResponse) {
        const compositionListTmp = compositionDataApiResponse.data.map(
          (composition) => (
            <li key={composition.id}>
              <div className="user-data-number round-icon">
                {composition.length}
              </div>
              <p className="composition-title">{composition.title}</p>
              <i
                className="fas fa-trash edition-button"
                onClick={() => handleDataDelete(composition.id, "score")}
              ></i>
              <i
                className="fas fa-share edition-button"
                onClick={() =>
                  handleUserCreationDataUpload(composition, "composition")
                }
              ></i>
            </li>
          )
        );
        setCompositionList(compositionListTmp);
      }
      setWaitingForApiResponse(false);
    } catch (e) {
      setWaitingForApiResponse(false);
      console.log("Error in MyProfile : " + e);
    }
  }, [handleUserCreationDataUpload]);

  const getUserScores = useCallback(async () => {
    try {
      const scoreDataApiResponse = await apiFetchScores();

      if (scoreDataApiResponse) {
        const scoreListTmp = scoreDataApiResponse.data.map((score) => (
          <li key={score.id}>
            <div className="user-data-number round-icon">{score.length}</div>
            <p className="score-title">{score.title}</p>
            <i
              className="fas fa-trash edition-button"
              onClick={() => handleDataDelete(score.id, "score")}
            ></i>
            <i
              className="fas fa-share edition-button"
              onClick={() => handleUserCreationDataUpload(score, "score")}
            ></i>
          </li>
        ));

        setScoreList(scoreListTmp);
      }
      setWaitingForApiResponse(false);
    } catch (e) {
      setWaitingForApiResponse(false);
      console.log("Error in MyProfile : " + e);
    }
  }, [handleUserCreationDataUpload]);

  useEffect(() => {
    getUserEmail();
  }, [getUserEmail]);

  useEffect(() => {
    getUserScores();
  }, [getUserScores]);

  useEffect(() => {
    getUserCompositions();
  }, [getUserCompositions]);

  return (
    <section id="my-profile" className="main-content">
      <AlertModal modalOpen={open} closeModal={dialogHandleClickClose}>
        {notificationMessage}
        {severityKind === "success" ? (
          <i className="far fa-smile modal-smiley"></i>
        ) : (
          <i className="far fa-frown-open modal-smiley"></i>
        )}
      </AlertModal>

      <div id="profile-header">
        <div className="profile-icon">T</div>
        <p className="profile-email">{userEmail}</p>
      </div>

      <div id="profile-content">
        <div className="column column1">
          <div className="user-data-header">
            <div className="user-creation-total-count">
              {scoreList && scoreList.length}
            </div>
            <h4>Mes partitions TCHoUKA</h4>
            <ul className="user-data-content">
              {waitingForApiResponse ? (
                <Loader
                  type="TailSpin"
                  color="#2ca4a0ff"
                  height={45}
                  width={45}
                />
              ) : scoreList ? (
                scoreList
              ) : (
                apiErrorMessage
              )}
            </ul>
          </div>
        </div>

        <div className="column column2">
          <div className="user-data-header">
            <div className="user-creation-total-count">
              {compositionList && compositionList.length}
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
              ) : compositionList ? (
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
