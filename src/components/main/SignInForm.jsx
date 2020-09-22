import React, { useContext } from "react";
import NotificationContext from "../../context/NotificationContext";
//libraries
import Loader from "react-loader-spinner";
import { apiSignIn } from "../../services/apiServices";
//styles
import "./Form.style.scss";
import { useForm } from "react-hook-form";
import LoginContext from "../../context/LoginContext";
import AlertModal from "../shared/AlertModal";

const SignInForm = () => {
  const { setLoggedIn } = useContext(LoginContext);
  const {
    setOpen,
    setSeverityKind,
    setNotificationMessage,
    open,
    notificationMessage,
    severityKind,
  } = useContext(NotificationContext);
  const { register, handleSubmit, errors } = useForm();
  const [waitingForApiResponse, setWaitingForApiResponse] = React.useState(
    false
  );
  const mailRegex = /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@\.%_])([-+!*\.$@%_\w]).{8,50}$/;

  const dialogHandleClickClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    const userData = {
      username: data.email,
      password: data.password,
    };

    try {
      setWaitingForApiResponse(true);
      const apiResponse = await apiSignIn(userData);

      if (apiResponse.success) {
        setWaitingForApiResponse(false);
        setSeverityKind("success");
        setNotificationMessage(apiResponse.message);
        setOpen(true);
        setLoggedIn(true);
      } else if (!apiResponse.success) {
        setWaitingForApiResponse(false);
        setNotificationMessage(apiResponse.message);
        setOpen(true);
      }
    } catch (e) {
      console.log("Erreur : ", e);
    }
  };

  if (waitingForApiResponse) {
    return <Loader type="TailSpin" color="#2ca4a0ff" height={45} width={45} />;
  } else {
    return (
      <>
        <AlertModal modalOpen={open} closeModal={dialogHandleClickClose}>
          {notificationMessage}
          {severityKind === "error" ? (
            <i className="far fa-frown-open modal-smiley"></i>
          ) : (
            <i className="far fa-smile modal-smiley"></i>
          )}
        </AlertModal>

        <div id="form-container">
          <h4>Inscription</h4>

          <form id="inscription-form" onSubmit={handleSubmit(onSubmit)}>
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
                  message: "L'email n'est pas au bon format",
                },
              })}
            />
            <p className="form-error-message">
              {errors.email && errors.email.message}
            </p>

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
                    "Le mot de passe doit contenir au minimum 8 caratères, donc au moins trois des quatres types suivants : majuscules, minuscules, chiffres, caratères spéciaux",
                },
              })}
            />
            <p className="form-error-message">
              {errors.password && errors.password.message}
            </p>

            <button
              id="inscrption-button"
              className="fas fa-check round-icon submit-button"
              type="submit"
            ></button>
          </form>
        </div>
      </>
    );
  }
};

export default SignInForm;
