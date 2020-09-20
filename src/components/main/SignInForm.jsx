import React, { useContext, useState } from "react";
import NotificationContext from "../../context/NotificationContext";
//libraries
import Loader from "react-loader-spinner";
import { apiSignUp } from "../../services/apiServices";
//styles
import "./Form.style.scss";
import { useForm } from "react-hook-form";
import { apiSignInUrl } from "../../config/urlConstants";
import LoginContext from "../../context/LoginContext";

const SignInForm = () => {
  const {loggedIn, setLoggedIn} = useContext(LoginContext)
  const notificationContext = useContext(NotificationContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const [waitingForApiResponse, setWaitingForApiResponse] = React.useState(
    false
  );
  const mailRegex = /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,32})$/;

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    const req = new Request(apiSignInUrl, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    try {
      setWaitingForApiResponse(true);
      const apiResponse = await apiSignUp(req);

      if (apiResponse.success) {
        setWaitingForApiResponse(false);
        notificationContext.setSeverityKind("success");
        notificationContext.setNotificationMessage(apiResponse.message);
        notificationContext.setOpen(true);
        setLoggedIn(true)
      } else if (!apiResponse.success) {
        setWaitingForApiResponse(false);
        notificationContext.setNotificationMessage(apiResponse.message);
        notificationContext.setOpen(true);
      }
    } catch (e) {
      console.log("Erreur : ", e);
    }
  };

  if (waitingForApiResponse) {
    return <Loader type="TailSpin" color="#2ca4a0ff" height={45} width={45} />;
  } else {
    return (
      <div id="form-container">
        <h4>Inscription</h4>

        <form onSubmit={handleSubmit(onSubmit)} id="inscription-form">
          <input
            type="email"
            className="form-field"
            id="email"
            name="email"
            placeholder="Email"
            autoFocus
            ref={register({
              required: { value: true, message: "Ce champ est vide" },
              pattern: {
                value: mailRegex,
                message: "Mon email n'est pas au bon format",
              },
            })}
          />
          {errors.email}

          <input
            type="password"
            id="password"
            className="form-field"
            name="password"
            placeholder="Mot de passe"
            ref={register({
              required: { value: true, message: "Ce champ est vide" },
              pattern: {
                value: passwordRegex,
                message:
                  "Mon mot de passe doit contenir au minimum 8 caratères, donc au moins trois des quatres types suivants : majuscules, minuscules, chiffres, caratères spéciaux ",
              },
            })}
          />
          {errors.password}

          <input
            id="connection-button"
            className="fas fa-check round-icon submit-button"
            type="submit"
          ></input>
        </form>
      </div>
    );
  }
};

export default SignInForm;
