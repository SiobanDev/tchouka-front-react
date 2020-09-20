import React from "react";
import Nav from "../components/main/navbar/Nav";
//styles
import "./Footer.style.scss";


const Footer = () => {
  return (
    <footer>
      <a href="/credits">Crédits</a>
      <a href="/conditions-generales-utilisation">Conditions générales d'utilisation</a>
      <a href="mailto:contact@sioban.fr">Contact</a>
    </footer>
  );
};

export default Footer;
