import React, { useContext } from "react";
//Contexts
import NotificationContext from "../../context/NotificationContext";
import LoginContext from "../../context/LoginContext";
//Libraries
import Loader from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Utils
import { apiSignUp } from "../../services/apiServices";
//Styles
import "./Form.style.scss";
//Components
import AlertModal from "../shared/AlertModal";
import ResponseIcon from "../shared/ResponseIcon";

const SignUpForm = () => {
  const {
    setOpen,
    setSeverityKind,
    setNotificationMessage,
    open,
    notificationMessage,
    severityKind,
  } = useContext(NotificationContext);
  const { register, handleSubmit, errors } = useForm();
  const [
    waitingForformattedApiResponse,
    setWaitingForformattedApiResponse,
  ] = React.useState(false);
  const { setLoggedIn } = useContext(LoginContext);

  const onSubmit = async (data) => {
    const userData = {
      username: data.email,
      password: data.password,
    };

    try {
      setWaitingForformattedApiResponse(true);
      const formattedApiResponse = await apiSignUp(userData);

      if (formattedApiResponse.success) {
        setWaitingForformattedApiResponse(false);

        setSeverityKind("success");
        setNotificationMessage(formattedApiResponse.message);
        setOpen(true);

        setLoggedIn(true);
        localStorage.setItem("userId", formattedApiResponse.data.addedData.id);

        localStorage.setItem("token", formattedApiResponse.data.token);
      } else if (!formattedApiResponse.success) {
        setWaitingForformattedApiResponse(false);
        setNotificationMessage(formattedApiResponse.message);
        setOpen(true);
      }
    } catch (e) {
      console.log("Erreur : ", e);
    }
  };

  if (waitingForformattedApiResponse) {
    return <Loader type="TailSpin" color="#2ca4a0ff" height={45} width={45} />;
  } else {
    return (
      <>
        <AlertModal modalOpen={open} closeModal={()=>setOpen(false)}>
          {notificationMessage}
          <ResponseIcon severityKind={severityKind} />
        </AlertModal>

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

            <button
              id="connection-button"
              className="round-icon submit-button"
              type="submit"
            >
              <FontAwesomeIcon icon={faSignInAlt} />
            </button>
          </form>
        </div>
      </>
    );
  }
};

export default SignUpForm;
