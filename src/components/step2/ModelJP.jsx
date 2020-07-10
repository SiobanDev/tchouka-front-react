import React from "react";
//images
import { jpNeutre } from "../../config/mediasConstants";
//styles
import "./ModelJP.style.scss";

const ModelJP = () => {
  return (
   <div className="model-container">
       <img className="model" src={jpNeutre} alt="neutral-model"/>
       <div id="body-part-tchou" className="body-part"></div>
       <div id="body-part-tchi" className="body-part"></div>
       <div id="body-part-cla" className="body-part"></div>
       <div id="body-part-bou" className="body-part"></div>
       <div id="body-part-bi" className="body-part"></div>
       <div id="body-part-dou" className="body-part"></div>
       <div id="body-part-di" className="body-part"></div>
       <div id="body-part-pou" className="body-part"></div>
       <div id="body-part-pi" className="body-part"></div>
   </div>
  );
};

export default ModelJP;