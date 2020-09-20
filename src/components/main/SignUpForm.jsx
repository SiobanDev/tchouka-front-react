import React, { useContext, useState } from "react";
import NotificationContext from "../../context/NotificationContext";
//libraries
import Loader from "react-loader-spinner";
import { apiSignUp } from "../../services/apiServices";
//styles
import "./Form.style.scss";
import { useForm } from "react-hook-form";
import { apiSignUpUrl } from "../../config/urlConstants";

const SignUpForm = () => {
  const notificationContext = useContext(NotificationContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const [waitingForApiResponse, setWaitingForApiResponse] = React.useState(
    false
  );

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    const req = new Request(apiSignUpUrl, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    try {
      setWaitingForApiResponse(true);
      const apiResponse = await apiSignUp();

      if (apiResponse.success) {
        setWaitingForApiResponse(false);
        notificationContext.setSeverityKind("success");
        notificationContext.setNotificationMessage(apiResponse.message);
        notificationContext.setOpen(true);
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
        <h4>Connexion</h4>

        <form onSubmit={handleSubmit(onSubmit)} id="connection-form">
          <input
            type="email"
            className="form-field"
            id="email"
            name="email"
            placeholder="Email"
            autoFocus
            ref={register({
              required: { value: true, message: "Ce champ est vide" },
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
            })}
          />
          {errors.password}

          <input
            id="connection-button"
            className="fas fa-sign-in-alt round-icon submit-button"
            type="submit"
          ></input>
        </form>
      </div>
    );
  }
};

export default SignUpForm;
