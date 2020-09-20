import React from "react";
import Nav from "../components/main/navbar/Nav";
//styles
import "./Header.style.scss";

const Header = () => {
  return (
    <header>
     { <p id="sign-up-in-container">
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
