import React from "react";
import { Link } from "react-router-dom";
//styles
import "./NextStep.style.scss";

export default function NextStep({ handleClick, nextPageUrl }) {
  
  return (
    <div id="next-step">
      <Link to={nextPageUrl} onClick={handleClick}>
        <i
          className="fas fa-arrow-circle-right round-icon"
        ></i>
      </Link>
      <Link to={nextPageUrl} onClick={handleClick}>Étape suivante</Link>
    </div>
  );
}
