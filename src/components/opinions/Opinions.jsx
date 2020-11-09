import React, { useContext, useEffect } from "react";
//Components
import OpinionForm from "./OpinionForm";
import AlertModal from "../shared/AlertModal";
import ResponseIcon from "../shared/ResponseIcon";
//Contexts
import NotificationContext from "../../context/NotificationContext";

const Opinions = () => {
  const { setOpen, open, notificationMessage, severityKind } = useContext(
    NotificationContext
  );

  useEffect(() => {
    if (open) {
      setTimeout(setOpen, 2000, false);
    }
  }, [open, setOpen]);

  return (
    <section id="opinion" className="main-content">
      <AlertModal modalOpen={open} closeModal={() => setOpen(false)}>
        {notificationMessage}
        <ResponseIcon severityKind={severityKind} />
      </AlertModal>
      <p>
        Une étape, un détail que tu n'as pas compris ?<br />
        Une fonctionnalité à laquelle tu as pensé et qui serait top ?
      </p>

      <p>
        Nous serions ravi.e.s de pouvoir améliorer ce site, alors ton opinion
        est importante, qu'elle concerne l'expérience utilisat.eur.rice, le
        design ou même ton kiff de Jean-Patricia !
      </p>
      <p>Tu peux nous partager ton retour grâce au formulaire qui suit :</p>

      <OpinionForm />
    </section>
  );
};

export default Opinions;
