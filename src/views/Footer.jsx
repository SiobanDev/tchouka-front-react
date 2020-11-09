import React from "react";
//styles
import "./Footer.style.scss";


const Footer = () => {
  return (
    <footer>
      <a href="/credits">Crédits</a>
      <a href="/mon-avis">Donner mon avis</a>
      <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>Contact</a>
    </footer>
  );
};

export default Footer;
