import React, { useEffect, useCallback, useContext } from "react";
//styles
import "./Header.style.scss";
import {
  apiGetAllScoresData,
  apiGetAllCompositionsData,
  deleteScore,
  deleteComposition,
} from "../../services/apiServices";
//libraries
import Loader from "react-loader-spinner";
import CompositionContext from "../../context/CompositionContext";
import ScoreContext from "../../context/ScoreContext";
import { handleScoreUploading, handleCompositionUploading } from "./MyProfile.services";
import NotificationContext from "../../context/NotificationContext";

const MyProfile = () => {
  const [waitingForApiResponse, setWaitingForApiResponse] = React.useState(
    true
  );
  const notificationContext = useContext(NotificationContext);

  const scoreList = [];
  const compositionList = [];
  const apiErrorMessage = "Erreur avec la récupération des données.";
  const { setComposition } = useContext(
    CompositionContext
  );
  const { setScore } = useContext(ScoreContext);


  const getScoresData = useCallback(async () => {
    try {
      const formattedApiResponse = await apiGetAllScoresData();
      if (formattedApiResponse) {
        formattedApiResponse.data.map((score) => {
          scoreList.push(
            <li key={score.id}>
              <div className="notes-number">{score.length - 1}</div>
              <p className="score-title">{score.title}</p>
              <i
                className="fas fa-trash edition-button"
                onClick={() => deleteScore(score.id)}
              ></i>
              <i
                className="fas fa-share edition-button"
                onClick={() => handleScoreUploading(score, setScore, notificationContext)}
              ></i>
            </li>
          );
        });
      }
      setWaitingForApiResponse(false);
    } catch (e) {
      setWaitingForApiResponse(false);
      console.log("Error in getNotes in AvailableNotesContainer : " + e);
    }
  }, []);

  const getCompositionsData = useCallback(async () => {
    try {
      const formattedApiResponse = await apiGetAllCompositionsData();
      if (formattedApiResponse) {
        formattedApiResponse.data.map((composition) => {
          compositionList.push(
            <li>
              <div className="notes-number">{composition.length - 1}</div>
              <p className="composition-title">{composition.title}</p>
              <i
                className="fas fa-trash edition-button"
                onClick={() => deleteComposition(composition.id)}
              ></i>
              <i
                className="fas fa-share edition-button"
                onClick={() => handleCompositionUploading(composition, setComposition, notificationContext)}
              ></i>
            </li>
          );
        });
      }
      setWaitingForApiResponse(false);
    } catch (e) {
      setWaitingForApiResponse(false);
      console.log("Error in getNotes in AvailableNotesContainer : " + e);
    }
  }, [compositionList]);

  useEffect(() => {
    getScoresData();
    getCompositionsData();
  }, [getCompositionsData, getScoresData]);

  return (
    <section id="my-profile" className="main-content">
      <div className="profile-header">
        <div className="profile-icon"></div>
        <p className="profile-email"></p>
      </div>

      <div className="profile-content">
        <div className="column1">
          <div className="score-header">
            <div className="score-number">{scoreList.length - 1}</div>
            <h4>Mes partitions TCHoUKA</h4>
            <ul>
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
          <div className="composition-header">
            <div className="composition-number">
              {compositionList.length - 1}
            </div>
            <h4>Mes compositions TCHoUKA</h4>
            <ul>
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
