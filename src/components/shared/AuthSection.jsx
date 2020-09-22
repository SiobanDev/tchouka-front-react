import React, { useContext } from "react";
//styles
import "./AuthSection.style.scss";
import LoginContext from "../../context/LoginContext";

const AuthSection = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLoggedIn(false)
  };

  return (
    <>
      <div
        className={`sign-in-up-container hidden ${loggedIn ? "visible" : ""}`}
      >
        <div className="profile-icon round-icon">T</div>
        <a className="inline-link profile-link" href="/profil">
          Mon profil
        </a>
        <span>/</span>
        <div id="log-out-link" className="inline-link" onClick={logOut}>
          Se déconnecter
        </div>
      </div>

      <div
        className={`sign-in-up-container hidden ${!loggedIn ? "visible" : ""}`}
      >
        <a className="inline-link" href="/inscription">
          M'inscrire
        </a>
        <span>/</span>
        <a className="inline-link" href="/connexion">
          Me connecter
        </a>
      </div>
    </>
  );
};

export default AuthSection;
