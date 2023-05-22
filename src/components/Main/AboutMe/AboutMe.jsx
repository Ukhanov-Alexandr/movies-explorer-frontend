import './AboutMe.css';
import React from "react";
import photo from '../../../images/ukh_port.jpg';
import { Portfolio } from '../Portfolio/Portfolio';

export const AboutMe = () => (
  <article className="article about-me">
    <h2 className="article__header" id="about-me">Студент</h2>
    <section className="two-columns about-me__columns">
      <div className="two-columns__column about-me__column about-me__content">
        <div className="about-me__description">
          <h2 className="about-me__header">Александр</h2>
          <h3 className="about-me__subheader">Фронтенд-разработчик, 26 лет</h3>
          <p className="about-me__text">
            Я родился и живу в Горно-Алтайске, закончил факультет оптики СГУГИТ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь катанием на сноуборде. Недавно начал кодить. Хочу развиваться в разработке веб-сервисов. Нравятся сложные задачи.
          </p>
        </div>
        <ul className="about-me__links">
          <li>
            <a className="about-me__link" href="https://github.com/Ukhanov-Alexandr" target="_blank" rel="noreferrer">
            Github
            </a>
          </li>
        </ul>
      </div>
      <figure className="two-columns__column about-me__column about-me__image-container">
        <img
          src={photo}
          className="about-me__image"
          alt="Аватар"
        />
      </figure>
    </section>
    <Portfolio />
  </article>
);