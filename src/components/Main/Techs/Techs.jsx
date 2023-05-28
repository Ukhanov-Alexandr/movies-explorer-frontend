import './Techs.css';
import React from "react";

export const Techs = () => (
  <article className="article techs">
    <h2 className="article__header" id="techs">Технологии</h2>
    <section className="techs__description">
      <h2 className="techs__header">7 технологий</h2>
      <p className="techs__text">
      На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
    </section>
    <ul className="techs__items">
      <li className="techs__item">
        <span className="techs__item-text">HTML</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">CSS</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">JS</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">React</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">Git</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">Express.js</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">mongoDB</span>
      </li>
    </ul>
  </article>
);