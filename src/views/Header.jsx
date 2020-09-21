import React, {useContext} from "react";
import Nav from "../components/main/navbar/Nav";
//styles
import "./Header.style.scss";
import LoginContext from "../context/LoginContext";

const Header = () => {
  const {loggedIn, setLoggedIn} = useContext(LoginContext)

  return (
    <header>
     { loggedIn ? <div><div className="profile-icon">T</div><a className="inline-link" href="/profil">Mon profil</a><div className="inline-link" onClick={setLoggedIn(false)}>Se déconnecter</div></div> : <p id="sign-up-in-container">
        <a className="inline-link" href="/inscription">
          M'inscrire
        </a>
        <span>/</span>
        <a className="inline-link" href="/connexion">
          Me connecter
        </a>
      </p>}

      <h1>TCHoUKA</h1>
      <Nav />
    </header>
  );
};

export default Header;
