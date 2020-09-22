import React, { useContext } from "react";
//styles
import "./InscriptionHook.style.scss";
import LoginContext from "../../context/LoginContext";

const InscriptionHook = ({ step }) => {
  const { loggedIn } = useContext(LoginContext);

  return (
    <div
      id="explanation-container"
      className={`hidden ${loggedIn ? "" : "visible"}`}
    >
      {(() => {
        switch (step) {
          case 0:
            return (
              <p>
                Si tu veux sauvegarder tes partitions ou tes compositions
                TCHoUKA, inscris-toi !
              </p>
            );
          case 1:
            return (
              <p className="inscription-hook">
                Je peux sauvegarder ma partition en me connectant à mon compte.
              </p>
            );
          case 2:
            return (
              <p className="instruction inscription-hook">
                Je peux sauvegarder ma composition en me connectant à mon
                compte.
              </p>
            );

          default:
            return null;
        }
      })()}
    </div>
  );
};

export default InscriptionHook;
