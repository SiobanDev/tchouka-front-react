import React from "react";
//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faFrownOpen } from "@fortawesome/free-regular-svg-icons";

const ResponseIcon = ({ severityKind }) => {
  return severityKind === "success" ? (
    <FontAwesomeIcon className="modal-smiley" icon={faSmile} />
  ) : (
    <FontAwesomeIcon className="modal-smiley" icon={faFrownOpen} />
  );
};

export default ResponseIcon;
