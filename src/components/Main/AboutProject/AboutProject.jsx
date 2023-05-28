import './AboutProject.css';
import React from "react";

export const AboutProject = () => (
  <article className="article about-project">
    <h2 className="article__header" id="about-project">О проекте</h2>
    <section className="two-columns about-project__columns">
      <div className="two-columns__column about-project__column">
        <h2 className="about-project__subheader">Дипломный проект включал 5 этапов</h2>
        <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className="two-columns__column about-project__column">
        <h2 className="about-project__subheader">На выполнение диплома ушло 5 недель</h2>
        <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
    </section>
    <div className="project-progress">
      <div className="project-progress__cell project-progress__cell_color_green">
        <span className="project-progress__text project-progress__text1">1 неделя</span>
      </div>
      <div className="project-progress__cell project-progress__cell_color_gray">
        <span className="project-progress__text">4 недели</span>
      </div>
      <div className="project-progress__cell project-progress__cell_color_transparent">
        <span className="project-progress__text">Back-end</span>
      </div>
      <div className="project-progress__cell project-progress__cell_color_transparent">
        <span className="project-progress__text">Front-end</span>
      </div>
    </div>
  </article>
);