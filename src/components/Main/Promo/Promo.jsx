import './Promo.css';
import React from "react";
import spiral from '../../../images/landing-logo.svg';

export const Promo = () => (
  <article className="promo" aria-label="Промо-блок">
    <section className="promo__container">
      <h1 className="promo__text">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className="promo__spiral" alt='spiral' src={spiral}/>
    </section>
  </article>
);