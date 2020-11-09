import React from "react";


const Credits = () => {
  return (
    <section className="main-content">
      <h3>CRÉDITS</h3>
      <p>
        Tous les éléments graphiques du site ainsi que le design général sont la propriété exclusive de Sioban.
      </p>
      <p>
        Pour la contacter, suivez <a className="inline-link" href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>ce lien</a>.
      </p>
      <p>
        Les icônes sont sous la <a className="inline-link" href="https://fontawesome.com/license">licence de Font Awesome</a>
        .
      </p>
    </section>
  );
};

export default Credits;
