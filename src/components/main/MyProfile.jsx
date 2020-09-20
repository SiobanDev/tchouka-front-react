import React, { useContext, useEffect, useCallback, useState } from "react";
import Nav from "./navbar/Nav";
//styles
import "./Header.style.scss";
import LoginContext from "../../context/LoginContext";
import {
  apiGetAllScoresData,
  apiGetAllCompositionsData,
} from "../../services/apiServices";
//libraries
import Loader from "react-loader-spinner";

const MyProfile = () => {
  const [waitingForApiResponse, setWaitingForApiResponse] = React.useState(
    true
  );
  const scoreList = [];
  const compositionList = [];
  const apiErrorMessage = "Erreur avec la récupération des données.";

  const getScoresData = useCallback(async () => {
    try {
      const formattedApiResponse = await apiGetAllScoresData();
      if (formattedApiResponse) {
        formattedApiResponse.data.map((score) => {
          scoreList.push(
            <li>
              <div className="notes-number">{score.length - 1}</div>
              <p className="score-title">{score.title}</p>{" "}
              <i className="fas fa-trash edition-button"></i>
              <i className="fas fa-share edition-button"></i>
            </li>
          );
        });
      }
      setWaitingForApiResponse(false);
    } catch (e) {
      setWaitingForApiResponse(false);
      console.log("Error in getNotes in AvailableNotesContainer : " + e);
    }
  }, [scoreList]);

  const getCompositionsData = useCallback(async () => {
    try {
      const formattedApiResponse = await apiGetAllCompositionsData();
      if (formattedApiResponse) {
        formattedApiResponse.data.map((composition) => {
          compositionList.push(
            <li>
              <div className="notes-number">{composition.length - 1}</div>
              <p className="composition-title">{composition.title}</p>{" "}
              <i className="fas fa-trash edition-button"></i>
              <i className="fas fa-share edition-button"></i>
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
