import React from "react";
import { Link } from "react-router-dom";
//styles
import "./NextStep.style.scss";

export default function NextStep({ handleClick, nextPageUrl }) {
  return (
    <div id="next-step">
      <Link to={nextPageUrl}>
        <i
          className="fas fa-arrow-circle-right round-icon"
          onClick={handleClick}
        ></i>
      </Link>
      <Link to={nextPageUrl}>Étape suivante</Link>
    </div>
  );
}
