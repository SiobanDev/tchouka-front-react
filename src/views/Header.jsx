import React, { useContext, useEffect } from "react";
import Nav from "../components/main/navbar/Nav";
//styles
import "./Header.style.scss";
import AuthSection from "../components/shared/AuthSection";

const Header = () => {
  return (
    <header>
      <AuthSection />
      <h1>TCHoUKA</h1>
      <Nav />
    </header>
  );
};

export default Header;
