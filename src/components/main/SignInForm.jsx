import React, { useContext } from "react";
import NotificationContext from "../../context/NotificationContext";
//libraries
import Loader from "react-loader-spinner";
import { apiSignIn } from "../../services/apiServices";
//styles
import "./Form.style.scss";
import { useForm } from "react-hook-form";
import LoginContext from "../../context/LoginContext";

const SignInForm = () => {
  const { setLoggedIn } = useContext(LoginContext);
  const notificationContext = useContext(NotificationContext);
  const { register, handleSubmit, errors } = useForm();
  const [waitingForApiResponse, setWaitingForApiResponse] = React.useState(
    false
  );
  const mailRegex = /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]).{8,32}$/;

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      setWaitingForApiResponse(true);
      const apiResponse = await apiSignIn(userData);

      if (apiResponse.success) {
        setWaitingForApiResponse(false);
        notificationContext.setSeverityKind("success");
        notificationContext.setNotificationMessage(apiResponse.message);
        notificationContext.setOpen(true);
        setLoggedIn(true);
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

        <form id="inscription-form" onSubmit={handleSubmit(onSubmit)} >
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
          <p className="form-error-message">{errors.email && errors.email.message}
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
                  "Le mot de passe doit contenir au minimum 8 caratères, donc au moins trois des quatres types suivants : majuscules, minuscules, chiffres, caratères spéciaux ",
              },
            })}
          />
          <p className="form-error-message">{errors.password && errors.password.message}</p>

          <button
            id="connection-button"
            className="fas fa-check round-icon submit-button"
            type="submit"
          ></button>
        </form>
      </div>
    );
  }
};

export default SignInForm;
