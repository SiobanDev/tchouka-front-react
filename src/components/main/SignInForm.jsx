import React, { useContext } from "react";
//Contexts
import NotificationContext from "../../context/NotificationContext";
//Libraries
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
//Utils
import { apiSignIn } from "../../services/apiServices";
//Styles
import "./Form.style.scss";
//Components
import AlertModal from "../shared/AlertModal";
import ResponseIcon from "../shared/ResponseIcon";

const SignInForm = () => {
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
        <AlertModal modalOpen={open} closeModal={()=>setOpen(false)}>
          {notificationMessage}
          <ResponseIcon severityKind={severityKind} />
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

            <button className="round-icon submit-button" type="submit">
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </form>
        </div>
      </>
    );
  }
};

export default SignInForm;
