import React, { useEffect, useCallback, useContext, useState } from "react";
//Utils
import {
  apiGetUserEmail,
  deleteUserData,
  apiFetchScores,
  apiFetchCompositions,
} from "../../services/apiServices";
//Libraries
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
//Styles
import "./MyProfile.style.scss";
//Context
import NotificationContext from "../../context/NotificationContext";
import CompositionContext from "../../context/CompositionContext";
import ScoreContext from "../../context/ScoreContext";
//Components
import AlertModal from "../shared/AlertModal";

import ResponseIcon from "../shared/ResponseIcon";

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
              <FontAwesomeIcon
                className="trash edition-button"
                icon={faTrashAlt}
                onClick={() => handleDataDelete(composition.id, "score")}
              />
              <FontAwesomeIcon
                className="edition-button"
                icon={faShare}
                onClick={() =>
                  handleUserCreationDataUpload(composition, "composition")
                }
              />
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
            <FontAwesomeIcon
              className="trash edition-button"
              icon={faTrash}
              onClick={() => handleDataDelete(score.id, "score")}
            />
            <FontAwesomeIcon
              className="edition-button"
              icon={faShare}
              onClick={() => handleUserCreationDataUpload(score, "score")}
            />
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
      <AlertModal modalOpen={open} closeModal={()=>setOpen(false)}>
        {notificationMessage}
        <ResponseIcon severityKind={severityKind} />
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
