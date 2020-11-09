import React, { useState, useContext } from "react";
//Styles
import "./OpinionForm.style.scss";
//Libraries
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import Loader from "react-loader-spinner";
//Contexts
import NotificationContext from "../../context/NotificationContext";

const OpinionForm = () => {
  const formDataInit = {
    name: "",
    email: "",
    feedbackTypeList: [],
    feedback: "",
  };
  const [formData, setFormData] = useState(formDataInit);
  const [waitingForLibraryResponse, setWaitingForLibraryResponse] = useState(
    false
  );
  const { setOpen, setSeverityKind, setNotificationMessage } = useContext(
    NotificationContext
  );

  const handleFormDataChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    if (name.includes("checkbox")) {
      setFormData({
        ...formData,
        feedbackTypeList: [...formData.feedbackTypeList, value],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setWaitingForLibraryResponse(true);

    const templateParams = {
      from_name: `${formData.name && formData.name} (${formData.email})`,
      to_name: "SIOBAN",
      feedbackTypeList: JSON.stringify(formData.feedbackTypeList),
      feedback: formData.feedback,
    };

    init("user_sFFCqs21CnOQQc6zNAGVi");

    emailjs.send("o2switch", "template_contact", templateParams).then(
      (response) => {
        setWaitingForLibraryResponse(false);

        if (response.status === 200) {
          setSeverityKind("success");
          setNotificationMessage("Merci pour votre retour !");
          setOpen(true);
        } else {
          setNotificationMessage(
            "Il y a eu une erreur avec l'envoi du formulaire...Tu peux nous contacter directement pour le signaler."
          );
          setOpen(true);
        }
      },
      (err) => {
        setNotificationMessage(
          "Il y a eu une erreur avec l'envoi du formulaire...Tu peux nous contacter directement pour le signaler."
        );
        setOpen(true);
        console.log(err);
      }
    );
  };

  return (
    <form id="opinion-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="name">Mon nom</label>
        <input
          name="name"
          type="text"
          placeholder="nom..."
          autoFocus
          onChange={handleFormDataChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Mon email</label>
        <input
          name="email"
          type="email"
          placeholder="email..."
          required
          onChange={handleFormDataChange}
        />
      </div>

      <fieldset name="checkbox-choices">
        <p className="checkbox-hook">Mon retour concerne :</p>
        <div className="checkbox-group">
          <input
            name="checkbox-design"
            type="checkbox"
            value="design"
            onChange={handleFormDataChange}
          />
          <label className="checkbox-label" htmlFor="checkbox-design">
            Design
          </label>
          <input
            name="checkbox-experience"
            type="checkbox"
            value="experience"
            onChange={handleFormDataChange}
          />
          <label className="checkbox-label" htmlFor="checkbox-experience">
            Expérience utilisat.eur.rice
          </label>
        </div>

        <div className="checkbox-group">
          <input
            name="checkbox-feature"
            type="checkbox"
            value="feature"
            onChange={handleFormDataChange}
          />
          <label className="checkbox-label" htmlFor="checkbox-feature">
            Fonctionnalité
          </label>
          <input
            name="checkbox-other"
            type="checkbox"
            value="other"
            onChange={handleFormDataChange}
          />
          <label className="checkbox-label" htmlFor="checkbox-other">
            Autre
          </label>
        </div>
      </fieldset>

      <textarea
        name="feedback"
        type="message"
        placeholder="Mon message..."
        rows="4"
        cols="50"
        required
        form="opinion-form"
        onChange={handleFormDataChange}
      />

      {waitingForLibraryResponse ? (
        <Loader
          className="loader"
          type="TailSpin"
          color="#2ca4a0ff"
          height={45}
          width={45}
        />
      ) : (
        <button type="submit">Envoyer</button>
      )}
    </form>
  );
};

export default OpinionForm;
